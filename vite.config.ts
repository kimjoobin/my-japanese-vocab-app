import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // ngrok URL을 허용 목록에 추가
    allowedHosts: [
      '3a65-61-101-109-119.ngrok-free.app',
      'localhost'
    ]
  }
})
