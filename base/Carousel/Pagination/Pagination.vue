<template>
  <div
    data-pagination
    class="pagination"
    :class="`pagination--${variant}`"
    v-touchmouse-down="clickOut"
  >
    <div
      data-fraction
      class="pagination__fraction"
      v-if="variant === 'fraction'"
    >
      {{ fraction }}
    </div>
    <template v-else>
      <button
        data-cta
        class="pagination__cta"
        :key="n"
        :aria-label="`Slide ${n}`"
        :class="(n - 1) === compPosition && 'pagination__cta--active'"
        v-for="n in nbSlides"
        v-touchmouse-down="handleClick.bind(null, n + baseIndex)"
        @keydown.enter="handleClick(n + baseIndex, $event)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { touchmouseDown } from '@/scripts/directives'
import { computed, defineComponent, ref, watch } from 'vue'

interface Props {
  nbSlides: number;
  isInfinite: boolean;
  paginationPosition: number;
}

export default defineComponent({
  name: 'Pagination',
  directives: {
    touchmouseDown,
  },
  props: {
    variant: { type: String, default: 'dash' },
    nbSlides: { type: Number, required: true },
    isInfinite: { type: Boolean, required: true },
    paginationPosition: { type: Number, required: true },
  },
  emits: [
    'select-slide',
  ],
  setup(props: Props, { emit }) {

    const baseIndex = ref<number>(props.isInfinite ? props.nbSlides - 1 : -1)

    const pagePosition = ref<number>(props.isInfinite ? props.nbSlides : 0)

    const compPosition = computed<number>(() => (
      props.isInfinite ? (pagePosition.value - props.nbSlides) : pagePosition.value
    ))

    const fraction = computed<string>(() => (
      props.isInfinite ? `${pagePosition.value - props.nbSlides + 1} / ${props.nbSlides}` : `${pagePosition.value + 1} / ${props.nbSlides}`
    ))

    function handleClick(pageSelected: number, event: MouseEvent|TouchEvent) {
      event.stopPropagation()
      return emit('select-slide', event, pageSelected)
    }

    function movePagination() {
      const isFirstSlide = props.paginationPosition >= (props.nbSlides * 2) || props.paginationPosition === 0
      if (isFirstSlide) return pagePosition.value = props.isInfinite ? props.nbSlides : 0

      const isLastSlide = props.paginationPosition < props.nbSlides
      if (isLastSlide) return pagePosition.value = props.isInfinite ? (props.paginationPosition + props.nbSlides) : props.paginationPosition

      return pagePosition.value = props.paginationPosition
    }

    watch(
      () => props.paginationPosition,
      () => movePagination(),
      { immediate: true },
    )

    const clickOut = (event: MouseEvent|TouchEvent) => event.stopPropagation()

    return {
      clickOut,
      fraction,
      baseIndex,
      handleClick,
      compPosition,
      pagePosition,
    }
  },
})
</script>

<style lang="sass">
.pagination
  $self: &
  width: 100%
  height: 50px
  z-index: 100
  display: flex
  align-items: center
  justify-content: center

  &__cta
    padding: 0
    width: 15px
    height: 15px
    margin: 0 5px
    outline: none
    cursor: pointer
    border-radius: 100%
    border: 1px solid $primary
    background-color: transparent

    &:focus
      @extend .outline

    &--active
      background-color: $primary

  &--dash

    #{ $self }__cta
      width: 25px
      height: 8px
      border-radius: 2px
</style>
