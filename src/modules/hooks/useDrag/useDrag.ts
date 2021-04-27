import { computed, ref } from 'vue'

export default () => {

  const delta = ref<number>(0)
  const dragOn = ref<boolean>(false)
  const startPoint = ref<number|null>(null)

  const direction = computed<string>(() => {
    if (delta.value > 0) return 'right'
    if (delta.value < 0) return 'left'
    return 'none'
  })

  function startDrag(event: MouseEvent|TouchEvent, condition: boolean, callback?: Function): void {
    event.preventDefault()
    if (!dragOn.value && condition) {
      dragOn.value = true
      startPoint.value = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
      if (callback) callback(event)
    }
  }

  function doDrag(event: MouseEvent|TouchEvent, offsetWidth: number, callback?: Function): void {
    event.preventDefault()
    if (dragOn.value && startPoint.value !== null) {
      const clientx = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
      delta.value = ((clientx - startPoint.value) / offsetWidth) * 100 * -1
      if (callback) callback(event)
    }
  }

  function stopDrag(event: MouseEvent|TouchEvent, callback?: Function): void {
    if (dragOn.value) {
      if (callback) callback(event)
      delta.value = 0
      dragOn.value = false
      startPoint.value = null
    }
  }

  return {
    doDrag,
    stopDrag,
    startDrag,
    direction,
    delta: computed<number>(() => delta.value),
    dragOn: computed<boolean>(() => dragOn.value),
  }
}
