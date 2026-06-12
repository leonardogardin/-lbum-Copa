import React from 'react';
import { Student, Sticker } from '../types';
import { Users, Award } from 'lucide-react';

interface StatsProps {
  students: Student[];
  stickers: Sticker[];
}

export const DashboardStats: React.FC<StatsProps> = ({ students, stickers }) => {
  const totalStudents = students.length;
  const totalStickersCount = stickers.length;
  const maxPossibleStickers = totalStudents * totalStickersCount;

  // Calculate total delivered
  let totalDelivered = 0;
  const stickerDistribution: Record<string, number> = {};

  // Initialize dict
  stickers.forEach(s => {
    stickerDistribution[s.id] = 0;
  });

  students.forEach(student => {
    Object.keys(student.stickers).forEach(stickerId => {
      if (student.stickers[stickerId]) {
        totalDelivered++;
        if (stickerDistribution[stickerId] !== undefined) {
          stickerDistribution[stickerId]++;
        }
      }
    });
  });

  return (
    <div className="grid grid-cols-2 max-w-2xl mx-auto gap-4 mb-6">
      {/* Stat 1: Total Alunos */}
      <div className="bg-white border-2 border-[#1072AF]/10 border-b-4 border-b-vibrant-blue rounded-2xl p-4 shadow-sm flex items-center space-x-3 transition-all hover:scale-[1.02] hover:shadow-md">
        <div className="p-3 bg-vibrant-blue/10 text-vibrant-blue rounded-xl shrink-0">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alunos</p>
          <p className="text-2xl font-black text-vibrant-dark-blue tracking-tight">{totalStudents}</p>
        </div>
      </div>

      {/* Stat 2: Total Entregues */}
      <div className="bg-white border-2 border-[#1072AF]/10 border-b-4 border-b-vibrant-yellow rounded-2xl p-4 shadow-sm flex items-center space-x-3 transition-all hover:scale-[1.02] hover:shadow-md">
        <div className="p-3 bg-vibrant-yellow/10 text-vibrant-dark-blue rounded-xl shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Figurinhas</p>
          <p className="text-2xl font-black text-vibrant-dark-blue tracking-tight">
            {totalDelivered} <span className="text-xs font-medium text-slate-400">/ {maxPossibleStickers}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
