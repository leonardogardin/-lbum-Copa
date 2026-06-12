export type StickerCategory = 'teachers' | 'students' | 'specials' | 'stars';

export interface Sticker {
  id: string;
  name: string;
  category: StickerCategory;
  number: string;
  avatarKey: string; // Key for the default SVG builder or custom Base64 uploaded image
  customImage?: string; // Base64 data URI uploaded by user
  description?: string;
  badgeText?: string;   // e.g. "PROFE", "CRAQUE", "ALUNO", "ESTRELA"
}

export interface Student {
  id: string;
  name: string;
  avatarKey: string;     // Matches her provided photo reference
  customImage?: string;  // Base64 data URI uploaded by user
  stickers: Record<string, boolean>; // stickerId -> hasReceived
  notes?: string;
}

export interface BulkActionHistory {
  id: string;
  date: string;
  stickerId: string;
  studentIds: string[];
}
