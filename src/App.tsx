import React, { useState, useEffect } from 'react';
import { WorkstationMode } from './types';
import * as PitchService from './services/pitchDetection';

const App: React.FC = () => {
  const [mode] = useState<WorkstationMode>('PERFORMANCE');
  const [note, setNote] = useState('---');
  const [isActive, setIsActive] = useState(false);

  const startEngine = async () => {
    try {
      // Chiede l'accesso al microfono
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 2048;
      source.connect(analyzer);

      setIsActive(true);

      // Ciclo di rilevamento nota
      const buffer = new Float32Array(analyzer.frequencyBinCount);
      const update = () => {
        analyzer.getFloatTimeDomainData(buffer);
        // Implementazione base veloce per feedback visivo
        const freq = PitchService.detectPitch(buffer, audioContext.sampleRate, {
          gateThreshold: 0.02,
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
      alert("Errore nell'accesso al microfono. Controlla i permessi!");
    }
  };

  return (
    <div style={{ 
      background: 'radial-gradient(circle, #1a0033 0%, #000000 100%)', 
      color: '#bc13fe', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'sans-serif' 
    }}>
      <h1 style={{ fontSize: '2rem', textShadow: '0 0 15px #bc13fe', marginBottom: '20px' }}>
        VOCAL SYNTH PRO
      </h1>
      
      <div style={{ 
        border: `3px solid ${isActive ? '#fff' : '#bc13fe'}`, 
        padding: '40px', 
        borderRadius: '30px', 
        textAlign: 'center',
        background: 'rgba(188, 19, 254, 0.05)',
        boxShadow: isActive ? '0 0 50px rgba(255, 255, 255, 0.3)' : '0 0 30px rgba(188, 19, 254, 0.2)'
      }}>
        <p style={{ letterSpacing: '2px', color: '#fff' }}>STATUS: {isActive ? 'LIVE' : 'IDLE'}</p>
        <div style={{ fontSize: '5rem', fontWeight: 'bold', margin: '15px 0' }}>{note}</div>
        <p style={{ color: '#888' }}>{isActive ? 'LISTENING...' : 'ENGINE READY'}</p>
      </div>

      <button 
        onClick={startEngine}
        disabled={isActive}
        style={{ 
          marginTop: '30px', 
          background: isActive ? '#444' : '#bc13fe', 
          color: 'white', 
          border: 'none', 
          padding: '15px 40px', 
          borderRadius: '50px', 
          cursor: isActive ? 'default' : 'pointer', 
          fontWeight: 'bold',
          boxShadow: '0 0 20px rgba(188, 19, 254, 0.5)'
        }}
      >
        {isActive ? 'ENGINE ACTIVE' : 'START ENGINE'}
      </button>
    </div>
  );
};

export default App;
