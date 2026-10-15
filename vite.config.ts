import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Org site (easymedicines.github.io) → base "/".
// Project site (…/easymeds/) → base "/easymeds/".
// Override anytime with BASE_PATH.
const getBasePath = () => {
  if (process.env.BASE_PATH) {
    const bp = process.env.BASE_PATH;
    return bp.endsWith('/') ? bp : `${bp}/`;
  }
  if (process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    // User/org Pages repo is served at the domain root
    if (repo.endsWith('.github.io')) return '/';
    return `/${repo}/`;
  }
  return '/';
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
