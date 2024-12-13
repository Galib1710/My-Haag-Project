import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './', // Your project root
  build: {
    outDir: 'dist', // Ensure output goes directly to dist
  },
  publicDir: 'public', // Ensures public files are copied to dist
});
