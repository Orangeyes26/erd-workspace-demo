import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// eRD Workspace — Vite + React
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
})
