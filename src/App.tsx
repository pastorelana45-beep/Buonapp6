import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Category, 
  WorkstationMode, 
  RecordedNote, 
  StudioSession, 
  ScaleType, 
  EngineSettings,
  Instrument,
  PadState 
} from './types';
import { detectPitch, frequencyToMidi, midiToNoteName } from './services/pitchDetection';
import { AudioEngine } from './services/audioEngine';
import { DEFAULT_SETTINGS, INSTRUMENTS } from './constants';
import './App.css';

const App: React.FC = () => {
  // Stati principali
  const [mode, setMode] = useState<WorkstationMode>('PERFORMANCE');
  const [settings, setSettings] = useState<EngineSettings>(DEFAULT_SETTINGS);
  const [currentInstrument, setCurrentInstrument] = useState<Instrument>(INSTRUMENTS[0]);
  const [pad, setPad] = useState<PadState>({ x: 0.5, y: 0.5 });
  const [isRecording, setIsRecording] = useState(false);
  const [currentNote, setCurrentNote] = useState<string>('---');

  // Riferimenti Audio
  const audioEngine = useRef<AudioEngine | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioEngine.current = new AudioEngine();
  }, []);

  // Gestione del Pad XY
  const handlePadMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    setPad({ x, y });
    if (audioEngine.current) {
      audioEngine.current.updateEffects(x, y);
    }
  };

  // Funzione di Registrazione e Download
  const toggleRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioEngine.current?.startRecording(stream);
      setIsRecording(true);
    } else {
      audioEngine.current?.stopAndDownload();
      setIsRecording(false);
    }
  };

  // Logica di Processamento Audio (Correzione riga 414 e 539)
  const processAudio = (buffer: Float32Array) => {
    const sampleRate = 44100;
    // CORREZIONE TS2554: Passiamo 3 argomenti come richiesto
    const freq = detectPitch(buffer, sampleRate, settings);
    
    if (freq) {
      const midi = frequencyToMidi(freq);
      setCurrentNote(midiToNoteName(midi));
    } else {
      setCurrentNote('---');
    }
  };

  // Esempio correzione TS7006 (riga 539 nei tuoi log)
  // Mappatura delle note con tipizzazione esplicita 'any' o 'number'
  const renderNoteMarker = (n: any) => (
    <div key={n} className="note-marker">
      {midiToNoteName(n)}
    </div>
  );

  return (
    <div className="vocal-synth-app">
      <header>
        <h1>VOCAL SYNTH PRO V9.2</h1>
        <div className="status-bar">
          MODE: {mode} | INST: {currentInstrument.name}
        </div>
      </header>

      <main>
        {/* PAD XY Effetti */}
        <div 
          className="effects-pad" 
          onMouseMove={handlePadMove}
          style={{ position: 'relative', background: '#0a0a0a', border: '2px solid #8a2be2', height: '300px' }}
        >
          <div 
            className="pad-cursor"
            style={{ 
              left: `${pad.x * 100}%`, 
              top: `${pad.y * 100}%`,
              position: 'absolute',
              width: '20px', height: '20px', background: '#bc13fe', borderRadius: '50%',
              boxShadow: '0 0 15px #bc13fe'
            }}
          />
          <span className="pad-label">XY PAD: FILTER & REVERB</span>
        </div>

        <div className="note-display">
          <h2>CURRENT NOTE</h2>
          <div className="note-value">{currentNote}</div>
        </div>

        <div className="controls">
          <button 
            className={`rec-button ${isRecording ? 'active' : ''}`}
            onClick={toggleRecording}
          >
            {isRecording ? 'STOP & SAVE OFFLINE' : 'REC MIDI TO VAULT'}
          </button>
        </div>
      </main>

      <footer>
        <div className="settings-summary">
          GATE: {settings.gateThreshold} RMS | SUSTAIN: {settings.sustainDecay}s
        </div>
      </footer>
    </div>
  );
};

export default App;
