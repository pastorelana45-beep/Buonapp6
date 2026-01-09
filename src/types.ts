export enum Category {
  PIANO = 'PIANO', KEYS = 'KEYS', STRINGS = 'STRINGS', 
  BRASS = 'BRASS', REED = 'REED', ORGAN = 'ORGAN', 
  GUITAR = 'GUITAR', BASS = 'BASS', SYNTH = 'SYNTH', 
  PERC = 'PERC', ETHNIC = 'ETHNIC'
}

// Aggiungiamo quello che manca per App.tsx
export type ScaleType = 'CHR' | 'MAJ' | 'MIN' | 'PEN';
export type WorkstationMode = 'PERFORMANCE' | 'STUDIO' | 'VAULT';

export interface RecordedNote {
  midi: number;
  time: number;
  duration: number;
  velocity: number;
}

export interface StudioSession {
  id: string;
  notes: RecordedNote[];
  timestamp: number;
}

export interface EngineSettings {
  transientSensitivity: number; 
  gateThreshold: number;        
  sustainDecay: number;         
  isQuantized: boolean;         
  noPitchBend: boolean;         
  currentScale: ScaleType;
  isVelocitySensitive: boolean; // Aggiunto per correggere constants.tsx
}

export interface PadState {
  x: number;
  y: number;
}
