import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Compute base path dynamically:
// 1. Explicit BASE_PATH env variable (passed by GitHub Actions)
// 2. If GITHUB_REPOSITORY exists and is not a *.github.io root repo, use /<repo-name>/
// 3. Fallback to root '/'
const getBasePath = () => {
  if (process.env.BASE_PATH) {
    let bp = process.env.BASE_PATH;
    if (!bp.endsWith('/')) bp += '/';
    return bp;
  }
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
  if (repo && !repo.endsWith('.github.io')) {
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
