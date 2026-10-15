import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Root GitHub Pages site (easymedicines.github.io) uses base "/".
// Override with BASE_PATH only if you ever need a project subpath.
const getBasePath = () => {
  const bp = process.env.BASE_PATH || '/';
  return bp.endsWith('/') ? bp : `${bp}/`;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 6000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
