import React, { useState, useRef } from 'react';
import { PadState } from '../types';

interface EffectsPadProps {
  onPadChange: (state: PadState) => void;
}

const EffectsPad: React.FC<EffectsPadProps> = ({ onPadChange }) => {
  const [position, setPosition] = useState<PadState>({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    const newState = { x, y };
    setPosition(newState);
    onPadChange(newState);
  };

  return (
    <div 
      ref={containerRef}
      className="effects-pad-container"
      style={{
        width: '100%',
        height: '300px',
        background: '#0a0a0a',
        border: '2px solid #bc13fe',
        borderRadius: '15px',
        position: 'relative',
        cursor: 'crosshair',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 20px rgba(188, 19, 254, 0.2)'
      }}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
    >
      {/* Linee della griglia */}
      <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', background: 'rgba(188, 19, 254, 0.2)' }} />
      <div style={{ position: 'absolute', left: '50%', height: '100%', width: '1px', background: 'rgba(188, 19, 254, 0.2)' }} />

      {/* Cursore luminoso */}
      <div 
        style={{
          position: 'absolute',
          left: `${position.x * 100}%`,
          top: `${position.y * 100}%`,
          width: '24px',
          height: '24px',
          background: '#bc13fe',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px #bc13fe, 0 0 40px #bc13fe',
          transition: 'box-shadow 0.2s'
        }}
      />
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        color: '#bc13fe',
        fontSize: '10px',
        fontFamily: 'monospace'
      }}>
        X: {position.x.toFixed(2)} | Y: {position.y.toFixed(2)}
      </div>
    </div>
  );
};

export default EffectsPad;

