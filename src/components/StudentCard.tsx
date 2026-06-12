import React, { useState, useRef } from 'react';
import { Student, Sticker } from '../types';
import { StudentAvatar } from './IllustrationBuilder';
import { 
  ArrowLeft, CheckCircle2, Copy, Trash2, 
  Camera, ChevronRight, ChevronLeft, Save, Edit
} from 'lucide-react';

interface CardProps {
  student: Student;
  allStudents: Student[];
  onSelectStudent: (student: Student) => void;
  stickers: Sticker[];
  onToggleSticker: (studentId: string, stickerId: string, state: boolean) => void;
  onUpdateStudent: (updated: Student) => void;
  onClose: () => void;
}

export const StudentCard: React.FC<CardProps> = ({
  student,
  allStudents,
  onSelectStudent,
  stickers,
  onToggleSticker,
  onUpdateStudent,
  onClose
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(student.name);
  const [notes, setNotes] = useState(student.notes || '');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stats for this kid
  const totalStickers = stickers.length;
  const collectedCount = Object.keys(student.stickers || {}).filter(
    key => student.stickers[key]
  ).length;
  const progressPercentage = Math.round((collectedCount / totalStickers) * 100);

  // Navigate between students
  const curIndex = allStudents.findIndex(s => s.id === student.id);
  const nextStudent = () => {
    if (curIndex !== -1 && curIndex < allStudents.length - 1) {
      onSelectStudent(allStudents[curIndex + 1]);
    } else {
      // Wrap around
      onSelectStudent(allStudents[0]);
    }
  };

  const prevStudent = () => {
    if (curIndex !== -1 && curIndex > 0) {
      onSelectStudent(allStudents[curIndex - 1]);
    } else {
      // Wrap around
      onSelectStudent(allStudents[allStudents.length - 1]);
    }
  };

  // Upload student customized face photo
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateStudent({
          ...student,
          customImage: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNameAndNotes = () => {
    onUpdateStudent({
      ...student,
      name: editedName,
      notes: notes
    });
    setIsEditingName(false);
  };

  // Rows configuration grouped dynamically by category:
  const row1 = stickers.filter(s => s.category === 'teachers');
  const row2 = stickers.filter(s => s.category === 'students');
  const row3 = stickers.filter(s => s.category === 'specials');
  const row4 = stickers.filter(s => s.category === 'stars');

  const renderStickerCell = (sticker: Sticker) => {
    const hasIt = student.stickers[sticker.id] || false;
    
    return (
      <div 
        key={sticker.id}
        onClick={() => onToggleSticker(student.id, sticker.id, !hasIt)}
        className="flex flex-col items-center cursor-pointer select-none active:scale-95 transition-all duration-150"
      >
        {/* Sticker Card */}
        <div className={`relative w-full aspect-[4/5] rounded-xl shadow-md border-2 transition-all flex flex-col justify-between p-1 bg-white overflow-hidden ${
          hasIt 
            ? 'border-vibrant-blue ring-4 ring-vibrant-yellow/45 scale-100 shadow-lg' 
            : 'border-solid border-slate-200 opacity-60 sticker-grayscale'
        }`}>
          {/* Top category label & number */}
          <div className="flex items-center justify-between pointer-events-none">
            <span className="text-[7.5px] font-black text-vibrant-dark-blue scale-90 origin-left uppercase truncate max-w-[70%]">
              {sticker.badgeText || 'COPA'}
            </span>
            <span className="text-[8px] font-black text-slate-450 font-mono scale-90 origin-right">
              {sticker.number}
            </span>
          </div>

          {/* Sticker portrait inside card */}
          <div className="w-full flex-grow flex items-center justify-center px-1">
            <div className="aspect-[3/4] w-full relative">
              <StudentAvatar 
                avatarKey={sticker.avatarKey} 
                customImage={sticker.customImage}
                className="w-full h-full" 
                shape="3x4"
              />
            </div>
          </div>

          {/* Sticker title/name */}
          <div className="text-center pointer-events-none mt-0.5 border-t border-slate-100 pt-0.5">
            <p className="font-extrabold text-[8px] leading-3 text-vibrant-dark-blue uppercase truncate">
              {sticker.name}
            </p>
          </div>

          {/* Sparkly corner overlay if acquired */}
          {hasIt && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-vibrant-success rounded-bl-lg flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-vibrant-yellow min-h-screen md:p-6 flex items-center justify-center font-sans pb-24">
      <div className="w-full max-w-lg bg-[#FAFAFA] rounded-none md:rounded-[40px] shadow-2xl border-0 md:border-[12px] border-[#222] flex flex-col overflow-hidden text-slate-800 relative">
        {/* Top Banner Navigation bar - Vibrant Palette */}
        <div className="bg-vibrant-dark-blue text-white p-4.5 border-b-4 border-vibrant-yellow sticky top-0 z-20 flex items-center justify-between shadow-md">
          <button 
            onClick={onClose}
            className="flex items-center text-xs font-black uppercase tracking-wider bg-vibrant-yellow text-vibrant-dark-blue hover:scale-105 active:scale-95 px-3 py-2 rounded-full transition-all cursor-pointer shadow-sm"
            id="btn-student-card-back"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1 stroke-[3]" />
            <span>Alunos</span>
          </button>

          <div className="flex items-center space-x-2">
            <button 
              onClick={prevStudent} 
              className="p-1 px-2.5 bg-white/10 hover:bg-white/20 active:scale-90 rounded-full cursor-pointer text-white transition-all"
              id="btn-student-card-prev"
              title="Aluno Anterior"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
            </button>
            
            <span className="text-xs font-black font-mono bg-black/20 text-vibrant-yellow px-2.5 py-1 rounded-full uppercase tracking-wider">
              {curIndex + 1} / {allStudents.length}
            </span>

            <button 
              onClick={nextStudent} 
              className="p-1 px-2.5 bg-white/10 hover:bg-white/20 active:scale-90 rounded-full cursor-pointer text-white transition-all"
              id="btn-student-card-next"
              title="Próximo Aluno"
            >
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

      {/* Main Responsive content scroll block */}
      <div className="max-w-md mx-auto p-4 flex flex-col items-center">
        
        {/* Mockup Header: Big Student Portrait */}
        <div className="relative flex flex-col items-center mt-3 mb-6">
          <div className="relative group">
            {/* The Outer Blue Ring frame from teachers mockup - Vibrant Palette style */}
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[8px] border-vibrant-dark-blue overflow-hidden bg-white shadow-xl relative flex items-center justify-center p-1 hover:scale-105 transition-transform duration-250">
              <StudentAvatar 
                avatarKey={student.avatarKey} 
                customImage={student.customImage}
                className="w-full h-full rounded-full" 
              />
            </div>
            
            {/* Upload Button overlay */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2.5 bg-vibrant-yellow border-2 border-vibrant-dark-blue rounded-full text-vibrant-dark-blue shadow-lg hover:scale-110 active:scale-95 transition-all text-xs"
              id="btn-students-cam-picker"
              title="Mudar Foto do Aluno"
            >
              <Camera className="w-5 h-5 stroke-[2.5]" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          <div className="mt-3 text-center flex flex-col items-center">
            {isEditingName ? (
              <div className="flex items-center space-x-1 border-b-2 border-vibrant-dark-blue bg-white/85 rounded-xl p-1.5 shadow-md mt-1">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="font-black font-display text-lg text-vibrant-dark-blue bg-transparent focus:outline-none px-1 py-0.5"
                  autoFocus
                />
                <button
                  onClick={handleSaveNameAndNotes}
                  className="text-emerald-600 p-1 hover:bg-emerald-50 rounded-md"
                  id="btn-save-student-name"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 mt-1">
                <h1 className="font-black font-display text-2xl text-vibrant-dark-blue uppercase tracking-tighter italic">
                  {student.name}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-vibrant-blue hover:text-vibrant-dark-blue p-1 rounded-md"
                  id="btn-edit-student-name-modal"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Overall counters */}
            <div className="text-xs font-bold text-vibrant-dark-blue bg-vibrant-yellow/20 px-4 py-2 rounded-full border-2 border-vibrant-yellow/70 mt-2 flex items-center space-x-2 shadow-sm">
              <span className="text-vibrant-yellow text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">★</span>
              <span>{collectedCount} de 19 figurinhas</span>
              <span className="text-vibrant-blue">•</span>
              <span className="text-vibrant-success font-black">{progressPercentage}% completo</span>
            </div>
          </div>
        </div>

        {/* Sticker interactive instructions */}
        <div className="w-full text-center text-[10px] uppercase font-bold text-slate-400 mb-3 tracking-wider">
          💡 Clique na figurinha para marcar como colecionada!
        </div>

        {/* ALBUM REPRESENTATION GRID */}
        <div className="w-full bg-[#1072AF]/5 rounded-[32px] p-4.5 shadow-inner border-4 border-[#222] flex flex-col space-y-4.5 mb-6">
          {/* Row 1 - Teachers (5 cards) */}
          <div>
            <div className="mb-2 pl-1">
              <span className="bg-vibrant-dark-blue text-vibrant-yellow text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full inline-block shadow-sm">
                Fila 1 - Professoras
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2.5 mt-1">
              {row1.map(stk => renderStickerCell(stk))}
            </div>
          </div>

          {/* Row 2 - Students (5 cards) */}
          <div>
            <div className="mb-2 pl-1">
              <span className="bg-vibrant-dark-blue text-vibrant-yellow text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full inline-block shadow-sm">
                Fila 2 - Alunos da Sala
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2.5 mt-1">
              {row2.map(stk => renderStickerCell(stk))}
            </div>
          </div>

          {/* Row 3 - Specials & Endrick / Vini (5 cards) */}
          <div>
            <div className="mb-2 pl-1">
              <span className="bg-vibrant-dark-blue text-vibrant-yellow text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full inline-block shadow-sm">
                Fila 3 - Conquistas e Seleção
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2.5 mt-1">
              {row3.map(stk => renderStickerCell(stk))}
            </div>
          </div>

          {/* Row 4 - Stars (4 cards centered or evenly split) */}
          <div>
            <div className="mb-2 pl-1">
              <span className="bg-vibrant-dark-blue text-vibrant-yellow text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full inline-block shadow-sm">
                Fila 4 - Craques da Copa
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2.5 mt-1">
              {row4.map(stk => renderStickerCell(stk))}
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};
