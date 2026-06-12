import React, { useState, useEffect } from 'react';
import { Student, Sticker } from './types';
import { initialStudents, initialStickers, initialLastUpdated } from './initialData';
import { DashboardStats } from './components/DashboardStats';
import { StudentCard } from './components/StudentCard';
import { BulkDistribution } from './components/BulkDistribution';
import { StickerGallery } from './components/StickerGallery';
import { StudentAvatar } from './components/IllustrationBuilder';
import { 
  Users, Award, Library, PlusCircle, Trash2, 
  Search, RefreshCw, Smartphone, ClipboardCheck, Trophy, Save
} from 'lucide-react';

const LOCAL_STUDENTS_KEY = 'album_copa_students_v1';
const LOCAL_STICKERS_KEY = 'album_copa_stickers_v1';
const LOCAL_VERSION_KEY = 'album_copa_version_v1';

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  // Navigation: 'students' | 'bulk' | 'gallery'
  const [activeTab, setActiveTab] = useState<'students' | 'bulk' | 'gallery'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [newStudentName, setNewStudentName] = useState('');

  const [isSavingDefault, setIsSavingDefault] = useState(false);
  const [saveDefaultStatus, setSaveDefaultStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSaveCurrentAsDefault = async () => {
    if (!window.confirm("Deseja salvar o progresso e dados atuais (alunos, fotos e figurinhas) como o padrão inicial do aplicativo de todos os dispositivos? Quando o app for aberto de qualquer celular ou computador, ele começará por padrão com estes dados exatos que você salvou agora!")) {
      return;
    }
    
    setIsSavingDefault(true);
    setSaveDefaultStatus('idle');
    try {
      const response = await fetch("/api/save-default", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ students, stickers }),
      });
      
      const resData = await response.json();
      if (response.ok && resData.success) {
        setSaveDefaultStatus("success");
        // Update local version so this device doesn't trigger a reset reload
        localStorage.setItem(LOCAL_VERSION_KEY, Date.now().toString());
      } else {
        setSaveDefaultStatus("error");
        alert("Erro: " + (resData.error || "Ocorreu um erro ao salvar como padrão."));
      }
    } catch (err: any) {
      console.error(err);
      setSaveDefaultStatus("error");
      alert("Erro ao conectar com o servidor: " + err.message);
    } finally {
      setIsSavingDefault(false);
    }
  };

  // Initial State Hydration
  useEffect(() => {
    const cachedVersionStr = localStorage.getItem(LOCAL_VERSION_KEY);
    const cachedVersion = cachedVersionStr ? parseInt(cachedVersionStr, 10) : 0;
    
    let forceReset = false;
    if (initialLastUpdated > 0 && initialLastUpdated > cachedVersion) {
      // Server has newer defaults - force sync
      localStorage.removeItem(LOCAL_STUDENTS_KEY);
      localStorage.removeItem(LOCAL_STICKERS_KEY);
      localStorage.setItem(LOCAL_VERSION_KEY, initialLastUpdated.toString());
      forceReset = true;
    } else if (initialLastUpdated > 0 && !cachedVersionStr) {
      localStorage.setItem(LOCAL_VERSION_KEY, initialLastUpdated.toString());
    }

    const savedStudents = forceReset ? null : localStorage.getItem(LOCAL_STUDENTS_KEY);
    const savedStickers = forceReset ? null : localStorage.getItem(LOCAL_STICKERS_KEY);

    if (savedStudents) {
      try {
        const parsed = JSON.parse(savedStudents) as Student[];
        const hydrated = parsed.map((s: Student) => {
          const defaultStudent = initialStudents.find(ds => ds.id === s.id);
          if (defaultStudent && (!s.customImage || !s.customImage.startsWith('data:image'))) {
            return { ...s, customImage: defaultStudent.customImage };
          }
          return s;
        });
        setStudents(hydrated);
      } catch (e) {
        setStudents(initialStudents);
      }
    } else {
      setStudents(initialStudents);
    }

    if (savedStickers) {
      try {
        const parsed = JSON.parse(savedStickers) as Sticker[];
        const hydrated = parsed.map((st: Sticker) => {
          const defaultSticker = initialStickers.find(ds => ds.id === st.id);
          if (defaultSticker) {
            const result = { ...st };
            if (!st.customImage || !st.customImage.startsWith('data:image')) {
              result.customImage = defaultSticker.customImage;
            }
            result.category = defaultSticker.category;
            result.badgeText = defaultSticker.badgeText;
            return result;
          }
          return st;
        });
        setStickers(hydrated);
      } catch (e) {
        setStickers(initialStickers);
      }
    } else {
      setStickers(initialStickers);
    }
  }, []);

  // Save changes to LocalStorage helper
  const saveStateToLocalStorage = (updatedStudents: Student[], updatedStickers?: Sticker[]) => {
    localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(updatedStudents));
    if (updatedStickers) {
      localStorage.setItem(LOCAL_STICKERS_KEY, JSON.stringify(updatedStickers));
    }
  };

  // Adding a new student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    // Build the sticker reference record initialized to false for all stickers
    const initialStickersRecord: Record<string, boolean> = {};
    stickers.forEach(s => {
      initialStickersRecord[s.id] = false;
    });

    // Create unique id and random avatarKey from available default students
    const availableKeys = ['joao', 'maria_isabelly', 'paula', 'perola', 'rhillary', 'willyan'];
    const randomKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];

    const newStudent: Student = {
      id: `std_${Date.now()}`,
      name: newStudentName.trim(),
      avatarKey: randomKey,
      stickers: initialStickersRecord,
      notes: ''
    };

    const updated = [...students, newStudent];
    setStudents(updated);
    saveStateToLocalStorage(updated);
    setNewStudentName('');
  };

  // Turn single sticker on/off for a student
  const handleToggleSticker = (studentId: string, stickerId: string, state: boolean) => {
    const updated = students.map(std => {
      if (std.id === studentId) {
        return {
          ...std,
          stickers: {
            ...std.stickers,
            [stickerId]: state
          }
        };
      }
      return std;
    });
    setStudents(updated);
    saveStateToLocalStorage(updated);
  };

  // Turn multiple students on/off for a single sticker (Bulk Distribution)
  const handleSetAllForSticker = (stickerId: string, targetStudentIds: string[], state: boolean) => {
    const updated = students.map(std => {
      const shouldUpdate = targetStudentIds.includes(std.id);
      return {
        ...std,
        stickers: {
          ...std.stickers,
          [stickerId]: shouldUpdate ? state : std.stickers[stickerId]
        }
      };
    });
    setStudents(updated);
    saveStateToLocalStorage(updated);
  };

  // Custom metadata or photos on student info
  const handleUpdateStudent = (updatedStudent: Student) => {
    const updated = students.map(std => {
      if (std.id === updatedStudent.id) {
        return updatedStudent;
      }
      return std;
    });
    setStudents(updated);
    saveStateToLocalStorage(updated);
  };

  // Update a single sticker definition (Custom images, tag text, description)
  const handleUpdateSticker = (updatedSticker: Sticker) => {
    const updated = stickers.map(stk => {
      if (stk.id === updatedSticker.id) {
        return updatedSticker;
      }
      return stk;
    });
    setStickers(updated);
    saveStateToLocalStorage(students, updated);
  };

  // Deleting a student record
  const handleDeleteStudent = (studentId: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja remover o(a) aluno(a) ${name}? Essa ação não pode ser desfeita.`)) {
      const updated = students.filter(s => s.id !== studentId);
      setStudents(updated);
      saveStateToLocalStorage(updated);
    }
  };

  // Fully reset application to initial default values
  const handleResetApplication = () => {
    if (window.confirm('⚠️ ATENÇÃO: Isso irá apagar todo o seu progresso de figurinhas entregues e fotos enviadas neste dispositivo. Deseja redefinir os dados para o padrão do servidor?')) {
      localStorage.removeItem(LOCAL_STUDENTS_KEY);
      localStorage.removeItem(LOCAL_STICKERS_KEY);
      localStorage.setItem(LOCAL_VERSION_KEY, initialLastUpdated.toString());
      setStudents(initialStudents);
      setStickers(initialStickers);
      setSelectedStudentId(null);
      setActiveTab('students');
    }
  };

  // Reset custom gallery images only
  const handleResetStickerImages = () => {
    const resetted = stickers.map(s => ({
      ...s,
      customImage: undefined,
      name: initialStickers.find(is => is.id === s.id)?.name || s.name,
      badgeText: initialStickers.find(is => is.id === s.id)?.badgeText || s.badgeText,
      description: initialStickers.find(is => is.id === s.id)?.description || s.description,
    }));
    setStickers(resetted);
    saveStateToLocalStorage(students, resetted);
  };

  // Active student object lookup
  const activeStudent = students.find(s => s.id === selectedStudentId);

  // Sort students alphabetically by name
  const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

  // Filter students based on search string
  const filteredStudents = sortedStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If a student is selected, focus entirely on their big album detail screen
  if (selectedStudentId && activeStudent) {
    return (
      <StudentCard
        student={activeStudent}
        allStudents={sortedStudents}
        onSelectStudent={(s) => setSelectedStudentId(s.id)}
        stickers={stickers}
        onToggleSticker={handleToggleSticker}
        onUpdateStudent={handleUpdateStudent}
        onClose={() => setSelectedStudentId(null)}
      />
    );
  }

  return (
    <div className="bg-vibrant-yellow min-h-screen md:p-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl bg-vibrant-bg rounded-none md:rounded-[40px] shadow-2xl border-0 md:border-[12px] border-[#222] flex flex-col overflow-hidden text-slate-800 relative pb-28">
        
        {/* Top Main Brazil Cup Header Banner - Vibrant Palette */}
        <header className="bg-vibrant-dark-blue text-white py-6 px-6 md:px-8 border-b-4 border-vibrant-yellow relative overflow-hidden">
          {/* Decorative design elements */}
          <div className="absolute top-[-30px] right-[-30px] w-48 h-48 rounded-full border border-vibrant-yellow opacity-10 pointer-events-none"></div>
          <div className="absolute bottom-[-50px] left-[-35px] w-60 h-60 rounded-full border-4 border-white opacity-5 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-vibrant-yellow text-vibrant-dark-blue p-2.5 rounded-2xl shadow-lg border-2 border-white animate-pulse shrink-0">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-white leading-tight">
                  Álbum da Turma <span className="text-vibrant-yellow">Copa 2026</span>
                </h1>
                <p className="text-blue-200 text-xs mt-1 font-bold uppercase tracking-widest">
                  Professora Edilaine
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Container */}
        <main className="flex-1 p-4 md:p-8">
        
        {/* Render Tab Views */}
        {activeTab === 'students' && (
          <div>
            <DashboardStats students={students} stickers={stickers} />

            {/* Action Bar for baking student data as initial default values on disk */}
            <div className="max-w-2xl mx-auto mb-6 bg-white border-2 border-[#1072AF]/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
              <div className="text-left">
                <h4 className="text-sm font-black text-vibrant-dark-blue flex items-center gap-1.5">
                  📥 Definir Padrão Geral do Aplicativo
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Salva as fotos e figurinhas atuais para que sejam o conteúdo padrão que carrega em qualquer celular ao abrir o link.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
                <button
                  onClick={handleResetApplication}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-tight transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 border border-slate-200 text-slate-650 hover:bg-red-50 hover:text-red-600 hover:border-red-200 select-none bg-white"
                  title="Restaurar para os dados padrão do servidor"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                  Limpar Cache & Sincronizar
                </button>
                <button
                  onClick={handleSaveCurrentAsDefault}
                  disabled={isSavingDefault}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 select-none ${
                    saveDefaultStatus === 'success'
                      ? 'bg-vibrant-success text-white font-black animate-bounce'
                      : 'bg-vibrant-yellow hover:bg-vibrant-yellow/90 text-vibrant-dark-blue hover:scale-[1.02] border border-vibrant-yellow/80'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  {isSavingDefault ? 'Gravando...' : saveDefaultStatus === 'success' ? 'Salvo no Servidor ✓' : 'Tornar Padrão'}
                </button>
              </div>
            </div>

            {/* Students List Display Grid */}
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 pl-1">
              Lista de Alunos ({students.length})
            </h2>

            {students.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-200 text-center text-slate-500">
                <p className="font-semibold">Nenhum aluno encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sortedStudents.map(student => {
                  const stickerCounts = Object.values(student.stickers || {}).filter(Boolean).length;
                  const pct = Math.round((stickerCounts / stickers.length) * 100);

                  return (
                    <div
                      key={student.id}
                      className="bg-white rounded-3xl p-4 shadow-md border-2 border-[#1072AF]/5 border-b-4 border-b-vibrant-yellow hover:border-[#1072AF]/30 hover:scale-[1.03] transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between">
                        {/* Student Info Clickable */}
                        <div 
                          onClick={() => setSelectedStudentId(student.id)}
                          className="flex items-center space-x-3.5 cursor-pointer flex-1 min-w-0"
                        >
                          <div className="w-12 h-12 flex-shrink-0 rounded-full border-2 border-vibrant-blue p-0.5 bg-white shadow-inner">
                            <StudentAvatar 
                              avatarKey={student.avatarKey} 
                              customImage={student.customImage}
                              className="w-full h-full rounded-full" 
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-black text-vibrant-dark-blue tracking-tight text-sm md:text-base leading-tight truncate">
                              {student.name}
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                              {stickerCounts} / {stickers.length} coladas
                            </p>
                          </div>
                        </div>

                        {/* Delete single button */}
                        <button
                          onClick={() => handleDeleteStudent(student.id, student.name)}
                          className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg shrink-0 transition-colors"
                          id={`btn-delete-${student.id}`}
                          title="Excluir Aluno"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
 
                      {/* Progress bar */}
                      <div 
                        onClick={() => setSelectedStudentId(student.id)}
                        className="mt-4 pt-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-[9px] text-slate-450 font-bold uppercase tracking-widest mb-1">
                          <span>Completado</span>
                          <span className="text-vibrant-success font-black">{pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-vibrant-success h-full rounded-full transition-all duration-300" 
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}


          </div>
        )}

        {activeTab === 'bulk' && (
          <BulkDistribution
            students={sortedStudents}
            stickers={stickers}
            onToggleStickers={handleToggleSticker}
            onSetAllForSticker={handleSetAllForSticker}
            onClose={() => setActiveTab('students')}
          />
        )}

        {activeTab === 'gallery' && (
          <StickerGallery
            stickers={stickers}
            onUpdateSticker={handleUpdateSticker}
            onResetStickers={handleResetStickerImages}
            onClose={() => setActiveTab('students')}
          />
        )}

      </main>

      {/* Persistent Sticky Bottom Navigation Bar (Optimized for Mobile Touch) */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur border-t border-slate-200/80 px-4 py-2.5 shadow-xl max-w-4xl mx-auto rounded-t-3xl md:bottom-2 md:rounded-3xl md:left-4 md:right-4 md:border-2 md:border-[#1072AF]/10">
        <div className="flex justify-around items-center">
          
          {/* Tab 1: Alunos list */}
          <button
            onClick={() => {
              setSelectedStudentId(null);
              setActiveTab('students');
            }}
            className={`flex flex-col items-center p-2.5 rounded-2xl w-24 transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'text-vibrant-dark-blue font-black bg-vibrant-yellow/30 scale-105 shadow-sm border-b-2 border-vibrant-dark-blue'
                : 'text-slate-400 hover:text-vibrant-dark-blue font-bold'
            }`}
            id="nav-tab-students"
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] tracking-wide uppercase font-extrabold">Turma</span>
          </button>

          {/* Tab 2: Collective Distribution */}
          <button
            onClick={() => {
              setSelectedStudentId(null);
              setActiveTab('bulk');
            }}
            className={`flex flex-col items-center p-2.5 rounded-2xl w-24 transition-all cursor-pointer ${
              activeTab === 'bulk'
                ? 'text-vibrant-success font-black bg-vibrant-success/10 scale-105 shadow-sm border-b-2 border-vibrant-success'
                : 'text-slate-400 hover:text-vibrant-success font-bold'
            }`}
            id="nav-tab-bulk"
          >
            <ClipboardCheck className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] tracking-wide uppercase font-extrabold">Entrega</span>
          </button>

          {/* Tab 3: Stickers edit library */}
          <button
            onClick={() => {
              setSelectedStudentId(null);
              setActiveTab('gallery');
            }}
            className={`flex flex-col items-center p-2.5 rounded-2xl w-24 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'text-purple-700 font-black bg-purple-500/10 scale-105 shadow-sm border-b-2 border-purple-700'
                : 'text-slate-400 hover:text-purple-700 font-bold'
            }`}
            id="nav-tab-gallery"
          >
            <Library className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] tracking-wide uppercase font-extrabold">Coleção</span>
          </button>

        </div>
      </nav>

      </div>
    </div>
  );
}
