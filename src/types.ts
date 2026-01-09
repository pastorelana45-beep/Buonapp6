export enum Category {
  PIANO = 'PIANO', KEYS = 'KEYS', STRINGS = 'STRINGS', 
  BRASS = 'BRASS', REED = 'REED', ORGAN = 'ORGAN', 
  GUITAR = 'GUITAR', BASS = 'BASS', SYNTH = 'SYNTH', 
  PERC = 'PERC', ETHNIC = 'ETHNIC'
}

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
  isVelocitySensitive: boolean;
}

export interface Instrument {
  id: string;
  name: string;
  category: Category;
}

export interface PadState {
  x: number;
  y: number;
}
