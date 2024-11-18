import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3013,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3007',
        changeOrigin: true,
        secure: false
      }
    }
  },
  optimizeDeps: {
    include: ['@heroicons/react', '@radix-ui/react-tabs']
  }
})
