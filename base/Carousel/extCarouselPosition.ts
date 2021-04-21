import { wait } from '@/scripts/utils'
import { ComputedRef, computed, onMounted, onUnmounted, Ref, ref } from 'vue'

interface Props {
  isCross: boolean;
  isInfinite: boolean;
}

export default (
  props: Props,
  nbSlides: Ref<number>,
  animationOn: Ref<boolean>,
  slider: ComputedRef<HTMLElement>,
) => {

  const { cancelWait, promiseWait } = wait()

  const position = ref<number>(0)
  const animationDelay = ref<number>(300)
  const paginationPosition = ref<number>(0)

  const isFirstIndex = computed<boolean>(() => position.value === 0)
  const isLastIndex = computed<boolean>(() => position.value === nbSlides.value - 1)
  const hasNoNext = computed<boolean>(() => !props.isInfinite && isLastIndex.value)
  const hasNoPrevious = computed<boolean>(() => !props.isInfinite && isFirstIndex.value)

  async function moveToPosition(newPosition: number, animated: boolean): Promise<void> {
    position.value = newPosition
    slider.value.style.transform = `translateX(-${position.value * (props.isCross ? 85 : 100)}%)`

    if (animated) {
      animationOn.value = true
      slider.value.style.transition = `transform ease-in ${animationDelay.value}ms`
      await promiseWait(animationDelay.value)
      animationOn.value = false
      slider.value.style.transition = ''
    }

    paginationPosition.value = position.value
  }

  const defaultPosition = () => moveToPosition(props.isInfinite ? nbSlides.value : 0, false)

  function resetSlider(): void {
    if (position.value >= (nbSlides.value * 2)) moveToPosition(position.value - nbSlides.value, false)
    if (position.value <= nbSlides.value) moveToPosition(position.value + nbSlides.value, false)
  }

  async function goTo(event: MouseEvent|TouchEvent, index: number|string): Promise<void> {
    event.stopPropagation()

    if (!animationOn.value) {

      const sliderEnds = (hasNoNext.value && index === 'next') || (hasNoPrevious.value && index === 'previous')
      if (sliderEnds) await moveToPosition(position.value, true)

      else if (!props.isInfinite && index < 0) await moveToPosition(0, true)

      else if (!props.isInfinite && index >= nbSlides.value) await moveToPosition(nbSlides.value - 1, true)

      else {
        if (index === 'next') await moveToPosition(position.value + 1, true)
        else if (index === 'previous') await moveToPosition(position.value - 1, true)
        else if (typeof index !== 'string') await moveToPosition(index, true)
        if (props.isInfinite) resetSlider()
      }
    }
  }

  onMounted(() => defaultPosition())

  onUnmounted(() => cancelWait())

  return {
    goTo,
    position: computed<number>(() => position.value),
    hasNoNext: computed<boolean>(() => hasNoNext.value),
    hasNoPrevious: computed<boolean>(() => hasNoPrevious.value),
    paginationPosition: computed<number>(() => paginationPosition.value),
  }
}
