import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' lets the built site work on Vercel, Netlify and GitHub Pages sub-paths
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] })
