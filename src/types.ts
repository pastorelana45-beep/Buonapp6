export enum Category {
  PIANO = 'PIANO', KEYS = 'KEYS', STRINGS = 'STRINGS', 
  BRASS = 'BRASS', REED = 'REED', ORGAN = 'ORGAN', 
  GUITAR = 'GUITAR', BASS = 'BASS', SYNTH = 'SYNTH', 
  PERC = 'PERC', ETHNIC = 'ETHNIC'
}

export interface EngineSettings {
  transientSensitivity: number; 
  gateThreshold: number;        
  sustainDecay: number;         
  isQuantized: boolean;         
  noPitchBend: boolean;         
  currentScale: 'CHR' | 'MAJ' | 'MIN' | 'PEN';
}

export interface PadState {
  x: number;
  y: number;
}
