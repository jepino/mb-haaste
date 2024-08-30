import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': env.VITE_API_URL
      }
    }
  })
}
