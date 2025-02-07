import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  build: {
  },
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  plugins: [
    react(),
  ],
});