import { ComputedRef, computed, ref } from 'vue'

interface Hook {
  doDrag: Function;
  stopDrag: Function;
  startDrag: Function;
  dragOn: ComputedRef<boolean>;
  startPointX: ComputedRef<number|null>;
  deltaX: ComputedRef<number|null>;
  clientX: ComputedRef<number|null>;
  directionX: ComputedRef<string|null>;
  startPointY: ComputedRef<number|null>;
  deltaY: ComputedRef<number|null>;
  clientY: ComputedRef<number|null>;
  directionY: ComputedRef<string|null>;
}

export default (): Hook => {

  const dragOn = ref<boolean>(false)

  /* X-Axis */

  const offsetW = ref<number|null>(null)
  const startPointX = ref<number|null>(null)
  const deltaX = ref<number|null>(null)
  const clientX = ref<number|null>(null)
  const directionX = ref<string|null>(null)

  /* Y-Axis */

  const offsetH = ref<number|null>(null)
  const startPointY = ref<number|null>(null)
  const deltaY = ref<number|null>(null)
  const clientY = ref<number|null>(null)
  const directionY = ref<string|null>(null)

  function startDrag({
    event,
    offsetWidth,
    offsetHeight,
    condition = true,
    callback,
  }: {
    event: MouseEvent|TouchEvent,
    offsetWidth: number,
    offsetHeight: number,
    condition: boolean,
    callback?: Function,
  }): void {

    event.preventDefault()

    if (!dragOn.value && condition) {

      dragOn.value = true

      /* X-Axis */

      startPointX.value = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX

      offsetW.value = offsetWidth

      /* Y-Axis */

      startPointY.value = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY

      offsetH.value = offsetHeight

      if (callback) callback(event)

    }
  }

  function doDrag(event: MouseEvent|TouchEvent, callback?: Function): void {

    event.preventDefault()

    if (dragOn.value) {

      /* X-Axis */

      if (startPointX.value !== null && offsetW.value) {

        clientX.value = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX

        deltaX.value = ((clientX.value - startPointX.value) / offsetW.value) * 100

        directionX.value = (deltaX.value > 0) ? 'right'
          : (deltaX.value < 0) ? 'left'
          : null
      }


      /* Y-Axis */

      if (startPointY.value !== null && offsetH.value) {

        clientY.value = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY

        deltaY.value = ((clientY.value - startPointY.value) / offsetH.value) * 100

        directionY.value = (deltaY.value > 0) ? 'bottom'
          : (deltaY.value < 0) ? 'top'
          : null
      }

      if (callback) callback(event)

    }
  }

  function stopDrag(event: MouseEvent|TouchEvent, callback?: Function): void {

    if (dragOn.value) {

      if (callback) callback(event)

      dragOn.value = false

      /* X-Axis */

      deltaX.value = null
      offsetW.value = null
      startPointX.value = null

      /* Y-Axis */

      deltaY.value = null
      offsetH.value = null
      startPointY.value = null
    }
  }

  return {
    doDrag,
    stopDrag,
    startDrag,
    dragOn: computed<boolean>(() => dragOn.value),
    /* X-Axis */
    startPointX: computed<number|null>(() => startPointX.value),
    deltaX: computed<number|null>(() => deltaX.value),
    clientX: computed<number|null>(() => clientX.value),
    directionX: computed<string|null>(() => directionX.value),
    /* Y-Axis */
    startPointY: computed<number|null>(() => startPointY.value),
    deltaY: computed<number|null>(() => deltaY.value),
    clientY: computed<number|null>(() => clientY.value),
    directionY: computed<string|null>(() => directionY.value),
  }
}
