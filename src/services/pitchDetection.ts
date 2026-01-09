import { EngineSettings } from '../types';

export const frequencyToMidi = (f: number): number => {
  return Math.round(69 + 12 * Math.log2(f / 440));
};

export const midiToNoteName = (midi: number): string => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return notes[midi % 12] + (Math.floor(midi / 12) - 1);
};

export function calculateRMS(buffer: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
  return Math.sqrt(sum / buffer.length);
}

// Nota: manteniamo i 3 argomenti richiesti
export function detectPitch(buffer: Float32Array, sampleRate: number, settings: EngineSettings): number | null {
  const rms = calculateRMS(buffer);
  if (rms < settings.gateThreshold) return null; 

  const threshold = 0.15;
  const halfSize = Math.floor(buffer.length / 2);
  const yinBuffer = new Float32Array(halfSize);

  for (let tau = 0; tau < halfSize; tau++) {
    for (let i = 0; i < halfSize; i++) {
      const delta = buffer[i] - buffer[i + tau];
      yinBuffer[tau] += delta * delta;
    }
  }

  let tau = -1;
  for (let t = 1; t < halfSize; t++) {
    if (yinBuffer[t] < threshold) { tau = t; break; }
  }

  if (tau === -1) return null;
  let frequency = sampleRate / tau;

  if (settings.isQuantized) {
    const midi = frequencyToMidi(frequency);
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  return frequency;
}
