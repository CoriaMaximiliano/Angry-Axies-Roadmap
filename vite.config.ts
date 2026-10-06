import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Debe coincidir con el path de GitHub Pages: /<nombre-del-repo>/
// Se puede cambiar sin tocar código: ROADMAP_BASE=/otro-nombre/ npm run build
const repoBase = process.env.ROADMAP_BASE || '/Angry-Axies-Roadmap/';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
}));
