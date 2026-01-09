import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore - Forza il compilatore a ignorare l'errore di percorso se il file esiste
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
