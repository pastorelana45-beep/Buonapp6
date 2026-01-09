import { EngineSettings } from '../types';

export const frequencyToMidi = (f: number): number => {
  return Math.round(69 + 12 * Math.log2(f / 440));
};

export const midiToNoteName = (midi: number): string => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return notes[midi % 12] + Math.floor(midi / 12 - 1);
};

export const detectPitch = (buffer: Float32Array, sampleRate: number, settings: EngineSettings): number | null => {
  // Autocorrelazione base
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  if (Math.sqrt(sum / buffer.length) < settings.gateThreshold) return null;

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
