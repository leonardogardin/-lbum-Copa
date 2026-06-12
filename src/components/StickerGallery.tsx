import React, { useState, useRef } from 'react';
import { Sticker, StickerCategory } from '../types';
import { StudentAvatar } from './IllustrationBuilder';
import { Upload, X, ArrowLeft, RefreshCw, Eye, Edit2 } from 'lucide-react';

interface GalleryProps {
  stickers: Sticker[];
  onUpdateSticker: (updated: Sticker) => void;
  onResetStickers: () => void;
  onClose: () => void;
}

export const StickerGallery: React.FC<GalleryProps> = ({
  stickers,
  onUpdateSticker,
  onResetStickers,
  onClose
}) => {
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [activeCategory, setActiveCategory] = useState<StickerCategory | 'all'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: { key: StickerCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'Todas' },
    { key: 'teachers', label: 'Professoras' },
    { key: 'students', label: 'Alunos' },
    { key: 'specials', label: 'Especiais' },
    { key: 'stars', label: 'Estrelas ⚽' },
  ];

  const filteredStickers = activeCategory === 'all'
    ? stickers
    : stickers.filter(s => s.category === activeCategory);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedSticker) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdateSticker({
          ...selectedSticker,
          customImage: base64String
        });
        setSelectedSticker({
          ...selectedSticker,
          customImage: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCustomImage = () => {
    if (selectedSticker) {
      onUpdateSticker({
        ...selectedSticker,
        customImage: undefined
      });
      setSelectedSticker({
        ...selectedSticker,
        customImage: undefined
      });
    }
  };

  const handleUpdateText = (field: 'name' | 'description' | 'badgeText', value: string) => {
    if (selectedSticker) {
      const updated = {
        ...selectedSticker,
        [field]: value
      };
      onUpdateSticker(updated);
      setSelectedSticker(updated);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-blue-800 text-white shadow-md p-4 flex items-center justify-center">
        <h2 className="text-lg font-bold font-display tracking-tight text-center">Banco de Figurinhas 📂</h2>
      </div>

      <div className="p-4 max-w-lg mx-auto">


        {/* Category Filters */}
        <div className="flex space-x-1.5 overflow-x-auto pb-3 mb-4 scrollbar-thin">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid List of Stickers */}
        <div className="grid grid-cols-2 xs:grid-cols-3 gap-3.5">
          {filteredStickers.map(sticker => (
            <div
              key={sticker.id}
              onClick={() => setSelectedSticker(sticker)}
              className="bg-white rounded-xl p-3 border border-slate-150 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center relative group"
            >
              <span className="absolute top-2 left-2 text-[10px] font-mono font-bold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">
                Nº {sticker.number}
              </span>

              {sticker.customImage && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}

              <div className="aspect-[3/4] w-14 my-1.5">
                <StudentAvatar 
                  avatarKey={sticker.avatarKey} 
                  customImage={sticker.customImage}
                  className="w-full h-full" 
                  shape="3x4"
                />
              </div>

              <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mb-0.5 mt-1">
                {sticker.badgeText}
              </span>
              <p className="font-bold text-slate-800 text-sm truncate w-full">{sticker.name}</p>
              
              <div className="mt-2 text-[10px] flex items-center text-blue-600 font-semibold opacity-80 group-hover:opacity-100">
                <Edit2 className="w-3 h-3 mr-1" />
                Personalizar
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Modal overlay */}
      {selectedSticker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl pb-6 p-4 shadow-2xl relative animate-in slide-in-from-bottom duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSticker(null)}
              className="absolute top-4 right-4 p-1.5 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors"
              id="btn-close-gallery-modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title */}
            <div className="mb-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Modo Edição • Nº {selectedSticker.number}
              </span>
              <h3 className="text-lg font-bold text-slate-800 mt-0.5">Editar Figurinha</h3>
            </div>

            {/* Preview Image Control */}
            <div className="flex flex-col items-center bg-slate-50 p-4 rounded-2xl mb-4 border border-dashed border-slate-200">
              <div className="aspect-[3/4] w-20 mb-3">
                <StudentAvatar
                  avatarKey={selectedSticker.avatarKey}
                  customImage={selectedSticker.customImage}
                  className="w-full h-full shadow-md"
                  shape="3x4"
                />
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="sticker-file-uploader"
              />

              <div className="flex space-x-2 w-full max-w-xs">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                  id="btn-upload-sticker-photo"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Enviar Foto</span>
                </button>
                {selectedSticker.customImage && (
                  <button
                    onClick={handleRemoveCustomImage}
                    className="bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold py-2.5 px-3 rounded-lg transition-colors"
                    id="btn-remove-sticker-photo"
                  >
                    Restaurar Padrão
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                Formatos aceitos: JPG, PNG. O arquivo será armazenado localmente em seu dispositivo.
              </p>
            </div>

            {/* Fields to Edit Texts */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Nome do Personagem
                </label>
                <input
                  type="text"
                  value={selectedSticker.name}
                  onChange={(e) => handleUpdateText('name', e.target.value)}
                  className="w-full bg-slate-100 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Categoria Texto / Tag
                </label>
                <input
                  type="text"
                  value={selectedSticker.badgeText}
                  onChange={(e) => handleUpdateText('badgeText', e.target.value)}
                  className="w-full bg-slate-100 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                  maxLength={20}
                  placeholder="EX: COPA, ESTRELA, CORTÊS"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Frase de efeito / Descrição
                </label>
                <textarea
                  value={selectedSticker.description}
                  onChange={(e) => handleUpdateText('description', e.target.value)}
                  className="w-full bg-slate-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 border-none focus:outline-none focus:ring-2 focus:ring-blue-600 h-16 resize-none"
                  maxLength={100}
                ></textarea>
              </div>
            </div>

            {/* Acknowledge Button */}
            <button
              onClick={() => setSelectedSticker(null)}
              className="mt-5 w-full bg-[#0047AB] text-white py-3 rounded-xl font-bold font-display shadow-md hover:scale-[1.01] transition-all text-center"
              id="btn-save-sticker-modal"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
