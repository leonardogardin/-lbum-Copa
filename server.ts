import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse requests
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Route to bake current state into default state on disk
  app.post("/api/save-default", async (req: express.Request, res: express.Response) => {
    try {
      const { students, stickers } = req.body;
      if (!students || !stickers) {
        return res.status(400).json({ error: "Faltando dados de alunos ou figurinhas." });
      }

      const fileContent = `import { Student, Sticker } from './types';

export const customStudents: Student[] | null = ${JSON.stringify(students, null, 2)};

export const customStickers: Sticker[] | null = ${JSON.stringify(stickers, null, 2)};

export const customLastUpdated: number = ${Date.now()};
`;

      const filePath = path.join(process.cwd(), "src", "customDefaultData.ts");
      await fs.writeFile(filePath, fileContent, "utf-8");

      console.log("Successfully updated customDefaultData.ts on disk!");
      res.json({ success: true, message: "Padrão do aplicativo atualizado com sucesso no servidor!" });
    } catch (err: any) {
      console.error("Failed to write customDefaultData.ts:", err);
      res.status(500).json({ error: err.message || "Erro ao salvar os novos padrões." });
    }
  });

  // Serve with Vite middleware in development, and static assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
