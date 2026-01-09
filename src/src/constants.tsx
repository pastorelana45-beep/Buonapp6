import { Category, EngineSettings } from './types';

export const DEFAULT_SETTINGS: EngineSettings = {
  transientSensitivity: 0.5,
  gateThreshold: 0.020,
  sustainDecay: 1.5,
  isQuantized: true,
  noPitchBend: true,
  currentScale: 'CHR'
};

export const INSTRUMENTS = [
  { id: 'concert-grand', name: 'CONCERT GRAND', category: Category.PIANO },
  { id: 'upright-piano', name: 'UPRIGHT PIANO', category: Category.PIANO },
  { id: 'mellow-piano', name: 'MELLOW PIANO', category: Category.PIANO },
  { id: 'saloon-piano', name: 'SALOON PIANO', category: Category.PIANO }
];

