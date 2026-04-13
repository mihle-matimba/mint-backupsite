import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: './index.html',
        business: './business.html',
        about: './about.html',
        contact: './contact.html',
        investor: './investor.html',
      },
    },
  },
})