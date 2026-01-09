export enum Category {
  PIANO = 'PIANO',
  KEYS = 'KEYS',
  STRINGS = 'STRINGS',
  BRASS = 'BRASS',
  REED = 'REED',
  ORGAN = 'ORGAN',
  GUITAR = 'GUITAR',
  BASS = 'BASS',
  SYNTH = 'SYNTH',
  PERC = 'PERC',
  ETHNIC = 'ETHNIC'
}

export interface EngineSettings {
  transientSensitivity: number; // 0.5 (50%)
  gateThreshold: number;        // 0.020 RMS
  sustainDecay: number;         // 1.5s
  isQuantized: boolean;         // MIDI Quantized
  noPitchBend: boolean;         // Per il piano
  currentScale: 'CHR' | 'MAJ' | 'MIN' | 'PEN';
}

export interface PadState {
  x: number; // Filter Cutoff
  y: number; // Reverb Mix
}

export interface Instrument {
  id: string;
  name: string;
  category: Category;
}
