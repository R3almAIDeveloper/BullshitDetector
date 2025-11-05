// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving and writing files from project root (for bullshit-detector-db.json)
      allow: ['..'],
    },
  },
  // Optional: Prevent Vite from optimizing node_modules/fs
  optimizeDeps: {
    exclude: [],
  },
});