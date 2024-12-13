import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 root: '.', // The project root (optional but makes things clear)
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: 'public/Homepage.html', // Set the entry point to your homepage.html
    },
  },
  publicDir: 'public', // Ensures public files like homepage.html are copied to dist
});
