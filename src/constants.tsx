import { Category, EngineSettings } from './types';

export const DEFAULT_SETTINGS: EngineSettings = {
  transientSensitivity: 0.5,
  gateThreshold: 0.020,
  sustainDecay: 1.5,
  isQuantized: true,
  noPitchBend: true,
  currentScale: 'CHR',
  isVelocitySensitive: true // Ora riconosciuto grazie al nuovo types.ts
};

export const INSTRUMENTS = [
  { id: 'concert-grand', name: 'CONCERT GRAND', category: Category.PIANO },
  { id: 'upright-piano', name: 'UPRIGHT PIANO', category: Category.PIANO },
  { id: 'solo-violin', name: 'SOLO VIOLIN', category: Category.STRINGS }
];
