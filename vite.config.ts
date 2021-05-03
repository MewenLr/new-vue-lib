import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueConf from './config/vite/vue'

export default defineConfig({
  plugins: [
    vue(vueConf),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  }
})
