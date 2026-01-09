// src/services/pitchDetection.ts
import { EngineSettings } from '../types';

export const frequencyToMidi = (f: number): number => {
  return Math.round(69 + 12 * Math.log2(f / 440));
};

export const midiToNoteName = (midi: number): string => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(midi / 12) - 1;
  const name = notes[midi % 12];
  return `${name}${octave}`;
};

export const detectPitch = (buffer: Float32Array, sampleRate: number, settings: EngineSettings): number | null => {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  // Se il volume è troppo basso, non rilevare nulla
  if (Math.sqrt(sum / buffer.length) < (settings.gateThreshold || 0.01)) return null;

  // Algoritmo di autocorrelazione semplice
  let bestR = 0;
  let bestPeriod = -1;
  for (let period = 40; period < 500; period++) {
    let r = 0;
    for (let i = 0; i < buffer.length - period; i++) {
      r += buffer[i] * buffer[i + period];
    }
    if (r > bestR) {
      bestR = r;
      bestPeriod = period;
    }
  }
  return bestPeriod !== -1 ? sampleRate / bestPeriod : null;
};
