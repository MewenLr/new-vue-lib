import { computed, ComputedRef, Ref } from 'vue'
import useDrag from '@/scripts/hooks/useDrag/useDrag'

interface Props {
  isCross: boolean;
  isInfinite: boolean;
}

export default (
  props: Props,
  goTo: Function,
  position: Ref<number>,
  animationOn: Ref<boolean>,
  carousel: Ref<HTMLElement|null>,
  slider: ComputedRef<HTMLElement>,
) => {

  const { delta, startDrag, doDrag, stopDrag } = useDrag()

  const isGoingNext = computed<boolean>(() => delta.value >= 10 && Math.round(delta.value / 100) < 2)
  const isGoingPrevious = computed<boolean>(() => delta.value <= -10 && Math.round(delta.value / 100) > -2)

  const carouselWidth = computed<number>(() => carousel.value?.offsetWidth ?? 0)

  function moveSlider() {
    const translate = (delta.value + position.value * (props.isCross ? 85 : 100)) * -1
    slider.value.style.transform = `translateX(${translate}%)`
  }

  function goToSlide(event: MouseEvent|TouchEvent) {
    const roundDelta = Math.round(delta.value / 100)
    const btwZeroAndTen = (delta.value > -10 && delta.value < 0) || (delta.value > 0 && delta.value < 10)

    if (delta.value === 0) goTo(event, 'next')
    else if (btwZeroAndTen) goTo(event, position.value)
    else if (isGoingNext.value) goTo(event, 'next')
    else if (isGoingPrevious.value) goTo(event, 'previous')
    else goTo(event, roundDelta + position.value)
  }

  const handleDragDown = (event: MouseEvent|TouchEvent) => startDrag(event, !animationOn.value)
  const handleDragMove = (event: MouseEvent|TouchEvent) => doDrag(event, carouselWidth.value, moveSlider)
  const handleDragUp = (event: MouseEvent|TouchEvent) => stopDrag(event, goToSlide)

  return {
    handleDragDown,
    handleDragMove,
    handleDragUp,
  }
}
