import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   root: './', // Ensure this is pointing to your project root
  build: {
    rollupOptions: {
      input: './public/Homepage.html' // Explicitly set the entry HTML file
    }
  },
});
