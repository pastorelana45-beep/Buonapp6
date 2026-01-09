import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Rimosso .tsx - TypeScript lo troverà automaticamente

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Target container 'root' not found in index.html");
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
