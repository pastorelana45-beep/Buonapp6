import React from 'react';
import ReactDOM from 'react-dom/client';
// Usiamo il percorso assoluto per forzare il compilatore
import App from './App.tsx'; 

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
