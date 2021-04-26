export default {
  props: {
    value: null,
    immediate: true,
    validator: {
      required: { test: true, msg: 'Required error message' },
      min: { test: 3, msg: 'Min error message' },
      max: { test: 8, msg: 'Max error message' },
      regex: { test: /[A-Z]/g, msg: 'Regex error message' },
      custom: {
        test: (value: string): boolean => {
          if (typeof value === 'string') return value.includes('s')
          return false
        },
        msg: 'Custom error message',
      },
    },
  },
}
