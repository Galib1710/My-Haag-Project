import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 build: {
    outDir: 'dist', // Ensure output goes directly to dist
    rollupOptions: {
      input: 'public/homepage.html', // Point to your homepage.html
    },
  },
  publicDir: 'public', // Ensures public files are copied to dist
});
