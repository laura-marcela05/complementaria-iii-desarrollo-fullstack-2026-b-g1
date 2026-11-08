import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración de las pruebas (Vitest)
  test: {
    environment: 'jsdom',               // simula el navegador dentro de Node
    globals: true,                      // permite usar test, expect, vi sin importarlos
    setupFiles: './src/setupTests.js',  // se carga antes de las pruebas
  },
})
