import React, { useState } from 'react';
import * as PitchService from './services/pitchDetection';
import { WorkstationMode } from './types';

const App: React.FC = () => {
  const [note, setNote] = useState('---');
  const [isActive, setIsActive] = useState(false);

  const startEngine = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyzer = audioCtx.createAnalyser();
      analyzer.fftSize = 2048;
      source.connect(analyzer);

      setIsActive(true);

      const buffer = new Float32Array(analyzer.frequencyBinCount);
      const update = () => {
        analyzer.getFloatTimeDomainData(buffer);
        const freq = PitchService.detectPitch(buffer, audioCtx.sampleRate, {
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
      alert("Microfono non trovato o negato!");
      console.error(err);
    }
  };

  return (
    <div style={{ background: '#000', color: '#bc13fe', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ textShadow: '0 0 10px #bc13fe' }}>VOCAL SYNTH PRO</h1>
      <div style={{ border: '2px solid #bc13fe', padding: '50px', borderRadius: '20px', textAlign: 'center', margin: '20px' }}>
        <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>{note}</div>
        <p style={{ color: '#fff' }}>{isActive ? 'LISTENING...' : 'READY'}</p>
      </div>
      <button 
        onClick={startEngine} 
        disabled={isActive}
        style={{ background: isActive ? '#333' : '#bc13fe', color: '#fff', border: 'none', padding: '15px 30px', borderRadius: '10px', fontSize: '1.2rem', cursor: 'pointer' }}
      >
        {isActive ? 'ENGINE RUNNING' : 'START ENGINE'}
      </button>
    </div>
  );
};

export default App;
