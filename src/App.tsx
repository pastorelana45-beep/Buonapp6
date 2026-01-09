import React, { useState, useRef } from 'react';
import * as PitchService from './services/pitchDetection';
import { WorkstationMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<WorkstationMode>('PERFORMANCE');
  const [note, setNote] = useState('---');
  const [isActive, setIsActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const startEngine = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyzer = ctx.createAnalyser();
      analyzer.fftSize = 2048;
      source.connect(analyzer);

      setIsActive(true);

      const buffer = new Float32Array(analyzer.frequencyBinCount);
      const update = () => {
        analyzer.getFloatTimeDomainData(buffer);
        const freq = PitchService.detectPitch(buffer, ctx.sampleRate, {
          gateThreshold: 0.01,
          isQuantized: true,
          currentScale: 'CHR',
          sustainDecay: 0.5
        });

        if (freq) {
          const midi = PitchService.frequencyToMidi(freq);
          setNote(PitchService.midiToNoteName(midi));
        }
        requestAnimationFrame(update);
      };
      update();
    } catch (err) {
      alert("Accesso microfono negato. Controlla i permessi del browser.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#bc13fe] flex flex-col items-center justify-between p-6 font-mono">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center border-b border-[#bc13fe]/30 pb-4">
        <div className="text-xs uppercase tracking-widest">System: Online</div>
        <div className="flex gap-4">
          {(['PERFORMANCE', 'STUDIO', 'VAULT'] as WorkstationMode[]).map((m) => (
            <button 
              key={m}
              onClick={() => setMode(m)}
              className={`text-[10px] px-3 py-1 border ${mode === m ? 'bg-[#bc13fe] text-black' : 'border-[#bc13fe]'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main Display */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="relative group">
          <div className="absolute -inset-1 bg-[#bc13fe] rounded-full blur opacity-20 group-hover:opacity-40 transition"></div>
          <div className="relative w-64 h-64 rounded-full border-2 border-[#bc13fe] flex flex-col items-center justify-center bg-black/50 backdrop-blur-xl">
            <span className="text-7xl font-black tracking-tighter">{note}</span>
            <span className="text-[10px] mt-2 opacity-50">REAL-TIME PITCH</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-md bg-[#111] border-2 border-[#bc13fe] p-6 rounded-3xl shadow-[0_0_50px_rgba(188,19,254,0.1)]">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-black">VOCAL SYNTH PRO</h1>
            <p className="text-[10px] opacity-70">HYPER-STATION V1.0</p>
          </div>
          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
        </div>

        <button 
          onClick={startEngine}
          disabled={isActive}
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            isActive 
            ? 'bg-transparent border border-[#bc13fe]/50 text-[#bc13fe]/50 cursor-default' 
            : 'bg-[#bc13fe] text-black hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(188,19,254,0.4)]'
          }`}
        >
          {isActive ? 'ENGINE ACTIVE' : 'INITIALIZE ENGINE'}
        </button>
      </div>
      
      <div className="mt-4 text-[8px] opacity-30 uppercase tracking-[0.3em]">Quantum Audio Processing Unit</div>
    </div>
  );
};

export default App;
