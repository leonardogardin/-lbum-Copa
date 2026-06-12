import React, { useState } from 'react';
import { Student, Sticker } from '../types';
import { StudentAvatar } from './IllustrationBuilder';
import { Check, CheckSquare, Square, Award, ArrowLeft, ShieldAlert } from 'lucide-react';

interface BulkProps {
  students: Student[];
  stickers: Sticker[];
  onToggleStickers: (studentId: string, stickerId: string, state: boolean) => void;
  onSetAllForSticker: (stickerId: string, studentIds: string[], state: boolean) => void;
  onClose: () => void;
}

export const BulkDistribution: React.FC<BulkProps> = ({
  students,
  stickers,
  onToggleStickers,
  onSetAllForSticker,
  onClose
}) => {
  const [selectedStickerId, setSelectedStickerId] = useState<string>(stickers[0]?.id || '');

  const activeSticker = stickers.find(s => s.id === selectedStickerId) || stickers[0];

  if (!activeSticker) return <div className="p-4 text-center">Nenhuma figurinha cadastrada.</div>;

  // Count how many kids have this active sticker
  const kidsWithSticker = students.filter(std => std.stickers[activeSticker.id]).length;

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-emerald-700 text-white shadow-md p-4 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="p-1 hover:bg-emerald-600 rounded-lg transition-colors flex items-center"
          id="btn-bulk-back"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Voltar</span>
        </button>
        <h2 className="text-lg font-bold font-display tracking-tight text-center flex-1">Entrega Coletiva 🇧🇷</h2>
        <div className="w-8"></div> {/* Spacer balance */}
      </div>

      <div className="p-4 max-w-lg mx-auto">
        <p className="text-sm text-slate-500 mb-4 bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 flex items-start gap-2">
          <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Dica de Professora:</strong> Use esta tela para marcar rápidamente quais alunos receberam a mesma figurinha hoje na entrega dos envelopes!
          </span>
        </p>

        {/* Step 1: Select Sticker */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-5 border border-slate-100">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
            1. Escolha a Figurinha
          </label>
          <div className="relative">
            <select
              value={selectedStickerId}
              onChange={(e) => setSelectedStickerId(e.target.value)}
              className="w-full bg-slate-100 rounded-xl px-3 py-3 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
            >
              {stickers.map(s => (
                <option key={s.id} value={s.id}>
                  Nº {s.number} - {s.name} ({s.badgeText})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
              ▼
            </div>
          </div>

          {/* Sticker Preview */}
          <div className="mt-4 flex items-center bg-sky-50 p-3 rounded-xl border border-sky-100/50">
            <div className="aspect-[3/4] w-12 flex-shrink-0">
               <StudentAvatar 
                 avatarKey={activeSticker.avatarKey} 
                 customImage={activeSticker.customImage}
                 className="w-full h-full" 
                 shape="3x4"
               />
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-sky-700 bg-sky-200/50 px-2 py-0.5 rounded-full">
                  Nº {activeSticker.number}
                </span>
                <span className="text-[10px] font-semibold text-[#0047AB] uppercase">
                  {activeSticker.badgeText}
                </span>
              </div>
              <p className="font-bold text-slate-800 text-base">{activeSticker.name}</p>
              <p className="text-xs text-slate-500 italic mt-0.5">{activeSticker.description}</p>
            </div>
          </div>
        </div>

        {/* Step 2: Distribution Actions & Kids Check List */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
                2. Marque quem já ganhou
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                {kidsWithSticker} de {students.length} alunos com esta figurinha
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onSetAllForSticker(activeSticker.id, students.map(s => s.id), true)}
                className="text-[11px] bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-bold px-2 py-1.5 rounded-lg border border-slate-200/60 transition-colors"
                id="btn-bulk-select-all"
              >
                Todos
              </button>
              <button
                onClick={() => onSetAllForSticker(activeSticker.id, [], false)}
                className="text-[11px] bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 font-bold px-2 py-1.5 rounded-lg border border-slate-200/60 transition-colors"
                id="btn-bulk-deselect-all"
              >
                Limpar
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {students.map(student => {
              const hasIt = student.stickers[activeSticker.id] || false;
              return (
                <div
                  key={student.id}
                  onClick={() => onToggleStickers(student.id, activeSticker.id, !hasIt)}
                  className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer border transition-all ${
                    hasIt
                      ? 'bg-emerald-50/50 border-emerald-200 shadow-sm'
                      : 'bg-slate-50/50 border-slate-200/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0">
                      <StudentAvatar 
                        avatarKey={student.avatarKey} 
                        customImage={student.customImage}
                        className="w-10 h-10" 
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-slate-800 text-sm">{student.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {Object.values(student.stickers || {}).filter(Boolean).length} / {stickers.length} coladas
                      </p>
                    </div>
                  </div>

                  <div>
                    {hasIt ? (
                      <div className="bg-emerald-500 text-white p-1 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="border-2 border-slate-300 w-6 h-6 rounded-lg flex items-center justify-center bg-white" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-[#0047AB] hover:bg-[#002776] text-white py-3.5 rounded-xl font-bold font-display shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center"
            id="btn-bulk-finish"
          >
            Concluir Distribuição
          </button>
        </div>
      </div>
    </div>
  );
};
