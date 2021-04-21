<template>
  <div
    data-carousel
    ref="carousel"
    class="carousel"
    :class="hasPagination && 'carousel--paginated'"
    v-resize="setSlidesWidth"
    v-touchmouse-down="handleDragDown"
    v-touchmouse-move.global="handleDragMove"
    v-touchmouse-up.global="handleDragUp"
  >
    <Slider
      ref="carouselSlider"
      class="carousel__slider"
      :is-infinite="isInfinite"
    >
      <slot />
    </Slider>
    <Navigation
      data-navigation
      class="carousel__navigation"
      :has-no-next="hasNoNext"
      :is-infinite="isInfinite"
      :has-no-previous="hasNoPrevious"
      v-if="hasNavigation"
      @change-slide="goTo"
    />
    <Pagination
      data-pagination
      class="carousel__pagination"
      :variant="pagination"
      :nb-slides="nbSlides"
      :is-infinite="isInfinite"
      :pagination-position="paginationPosition"
      v-if="hasPagination"
      @select-slide="goTo"
    />
  </div>
</template>

<script lang="ts">
import { resize, touchmouseUp, touchmouseDown, touchmouseMove } from '@/scripts/directives'
import { computed, DefineComponent, defineComponent, onBeforeMount, onMounted, ref, VNodeNormalizedChildren } from 'vue'
import Slider from './Slider/Slider.vue'
import extCarouselDrag from './extCarouselDrag'
import Navigation from './Navigation/Navigation.vue'
import Pagination from './Pagination/Pagination.vue'
import extCarouselPosition from './extCarouselPosition'

const paginationValidator = ['dash', 'dot', 'fraction', 'none']

/**
 * @desc Carousel component
 * slides : [slots.default]
 * !isInfinite, slides x1 ['current']
 * isInfinite, slides x3 ['before', 'current', 'after']
 */
export default defineComponent({
  name: 'Carousel',
  components: {
    Slider,
    Navigation,
    Pagination,
  },
  directives: {
    resize,
    touchmouseUp,
    touchmouseDown,
    touchmouseMove,
  },
  props: {
    isCross: { type: Boolean, default: false },
    isInfinite: { type: Boolean, default: false },
    hasNavigation: { type: Boolean, default: false },
    pagination: {
      type: String,
      default: 'none',
      validator: (prop: string) => paginationValidator.includes(prop),
    },
  },
  setup(props: { pagination: string; isCross: boolean; isInfinite: boolean }, { slots }) {

    onBeforeMount((): false|void => !slots.default && console.error('Carousel requires slides as default slot.'))

    const carousel = ref<HTMLElement|null>(null)
    const carouselSlider = ref<DefineComponent|null>(null)
    const slider = computed<HTMLElement>(() => carouselSlider.value && carouselSlider.value.$el)
    const slides = computed<VNodeNormalizedChildren|null>(() => (slots.default && slots.default()[0].children) ?? null)

    const animationOn = ref<boolean>(false)
    const nbSlides = ref<number>(slides.value ? (slides.value.length as number) : 0)

    const hasPagination = computed<boolean>(() => props.pagination !== 'none')

    function setSlidesWidth(): void {
      const carouselEl = carousel.value as HTMLStyleElement
      carouselEl.querySelectorAll('.slide').forEach((slide) => {
        const slideEl = slide as HTMLStyleElement
        slideEl.style.minWidth = `${carouselEl.offsetWidth * (props.isCross ? 0.8 : 1)}px`
        slideEl.style.padding = props.isCross ? `0 ${carouselEl.offsetWidth * 0.025}px` : ''
      })
    }

    onMounted(() => setSlidesWidth())

    const {
      goTo,
      position,
      hasNoNext,
      hasNoPrevious,
      paginationPosition,
    } = extCarouselPosition(props, nbSlides, animationOn, slider)

    const {
      handleDragDown,
      handleDragMove,
      handleDragUp,
    } = extCarouselDrag(props, goTo, position, animationOn, carousel, slider)

    return {
      carousel,
      nbSlides,
      hasPagination,
      carouselSlider,
      setSlidesWidth,

      goTo,
      position,
      hasNoNext,
      hasNoPrevious,
      paginationPosition,

      handleDragMove,
      handleDragDown,
      handleDragUp,
    }
  },
})
</script>

<style lang="sass">
$carousel-navigation-size: 50px

.carousel
  width: 100%
  height: 100%
  overflow: hidden
  user-select: none
  position: relative
  touch-action: none

  &__slider
    margin: 0
    padding: 0
    width: 100%
    height: 100%
    display: flex

  &--paginated
    padding-bottom: $carousel-navigation-size

    .navigation
      top: calc(50% - #{$carousel-navigation-size})
</style>
