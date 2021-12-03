import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

function resolve(dir) {
  return path.join(__dirname, dir);
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
