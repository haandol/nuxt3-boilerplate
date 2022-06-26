import path from 'path'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [eslintPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
})
