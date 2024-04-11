import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
      proxy:{
        '/api':'jio-saavn-music1.vercel.app'
      }
  },
  plugins: [react()],
})
