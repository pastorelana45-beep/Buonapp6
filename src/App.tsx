import React, { useState } from 'react';
import { WorkstationMode } from './types';

const App: React.FC = () => {
  const [mode] = useState<WorkstationMode>('PERFORMANCE');
  const [note] = useState('---');

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
        border: '3px solid #bc13fe', 
        padding: '40px', 
        borderRadius: '30px', 
        textAlign: 'center',
        background: 'rgba(188, 19, 254, 0.05)',
        boxShadow: '0 0 30px rgba(188, 19, 254, 0.2)'
      }}>
        <p style={{ letterSpacing: '2px', color: '#fff' }}>STATUS: {mode}</p>
        <div style={{ fontSize: '5rem', fontWeight: 'bold', margin: '15px 0' }}>{note}</div>
        <p style={{ color: '#888' }}>ENGINE READY</p>
      </div>

      <button 
        style={{ 
          marginTop: '30px', 
          background: '#bc13fe', 
          color: 'white', 
          border: 'none', 
          padding: '15px 40px', 
          borderRadius: '50px', 
          cursor: 'pointer', 
          fontWeight: 'bold'
        }}
      >
        START ENGINE
      </button>
    </div>
  );
};

export default App;
