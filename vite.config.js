import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/StockSquares-Educational-Frontend/',  // Replace this with your repo name
  plugins: [react()],
})
