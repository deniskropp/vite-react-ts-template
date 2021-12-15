import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import * as path from 'path';

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin({svgrOptions: {icon: true}}),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
