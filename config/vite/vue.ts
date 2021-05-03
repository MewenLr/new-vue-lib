import { Options } from '@vitejs/plugin-vue'
import ssrTransformCustomDir from './ssrTransformCustomDir'

const options: Options = {
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
}

export default options
