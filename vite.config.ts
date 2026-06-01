import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel serves from the domain root; GitHub Pages serves from /cv-tsx/.
const base = process.env.VERCEL ? '/' : '/cv-tsx/'

export default defineConfig({
  plugins: [react()],
  base,
})
