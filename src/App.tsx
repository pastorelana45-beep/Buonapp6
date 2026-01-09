import React, { useState, useEffect } from 'react';
import { WorkstationMode, PadState } from './types';
// Importiamo il componente Pad se lo hai già creato, altrimenti lo commentiamo
// import EffectsPad from './components/effectsPad';

const App: React.FC = () => {
  const [mode, setMode] = useState<WorkstationMode>('PERFORMANCE');
  const [isRecording, setIsRecording] = useState(false);
  const [note, setNote] = useState('---');

  // Stile Neon dinamico
  const neonShadow = "0 0 15px #bc13fe, 0 0 30px #bc13fe";

  return (
    <div className="min-h-screen bg-black text-[#bc13fe] flex flex-col items-center justify-center p-4 font-sans">
      {/* Header */}
      <header className="absolute top-10 text-center">
        <h1 className="text-4xl font-black tracking-tighter italic" style={{ textShadow: neonShadow }}>
          VOCAL SYNTH PRO
        </h1>
        <div className="flex gap-4 mt-4 justify-center">
          {(['PERFORMANCE', 'STUDIO', 'VAULT'] as WorkstationMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 text-xs border ${mode === m ? 'bg-[#bc13fe] text-black' : 'border-[#bc13fe]'} rounded-full transition-all`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      {/* Main Display */}
      <div className="flex flex-col items-center gap-8">
        <div className="w-64 h-64 rounded-full border-4 border-[#bc13fe] flex items-center justify-center flex-col relative" style={{ boxShadow: `inset ${neonShadow}, ${neonShadow}` }}>
          <span className="text-xs uppercase tracking-widest opacity-70">Detecting</span>
          <span className="text-7xl font-bold mt-2">{note}</span>
        </div>

        {/* Controls */}
        <div className="flex gap-10">
          <div className="text-center">
            <p
