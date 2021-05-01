import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import ssrTransformCustomDir from './config/vite/ssrTransformCustomDir'

export default defineConfig({
  plugins: [
    vue(
      {
        template: {
          ssr: true,
          compilerOptions: {
            directiveTransforms: {
              'touchmouse-down': ssrTransformCustomDir,
              'touchmouse-move': ssrTransformCustomDir,
              'touchmouse-up': ssrTransformCustomDir,
            },
          },
        },
      },
    ),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  }
})
