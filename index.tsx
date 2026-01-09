import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Selezioniamo l'elemento con un cast di tipo per TypeScript
const rootElement = document.getElementById('root') as HTMLElement;

if (!rootElement) {
  // Questo aiuta il build a non fallire per incertezza sull'elemento DOM
  throw new Error("Failed to find the root element. Check index.html");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
