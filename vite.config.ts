import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Indica che la root è la cartella principale
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  }
});
