<template>
  <div class="navigation">
    <button
      data-previous
      class="navigation__cta"
      aria-label="Previous Slide"
      :class="hasNoPrevious && 'navigation__cta--disabled'"
      v-touchmouse-down="clickPrevious"
      @keydown.enter="clickPrevious"
    >
      <SvgIcon
        variant="white"
        class="navigation__icon"
        :icon="'chevron-left'"
      />
    </button>
    <button
      data-next
      class="navigation__cta"
      aria-label="Next Slide"
      :class="hasNoNext && 'navigation__cta--disabled'"
      v-touchmouse-down="clickNext"
      @keydown.enter="clickNext"
    >
      <SvgIcon
        variant="white"
        class="navigation__icon"
        :icon="'chevron-right'"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { touchmouseDown } from '@/scripts/directives'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

interface Props {
  hasNoNext: boolean;
  isInfinite: boolean;
  hasNoPrevious: boolean;
}

export default defineComponent({
  name: 'Navigation',
  components: {
    SvgIcon,
  },
  directives: {
    touchmouseDown,
  },
  props: {
    hasNoNext: { type: Boolean, required: true },
    isInfinite: { type: Boolean, required: true },
    hasNoPrevious: { type: Boolean, required: true },
  },
  emits: [
    'change-slide',
  ],
  setup(props: Props, { emit }) {

    function clickNext(event: MouseEvent|TouchEvent) {
      event.stopPropagation()
      if (!props.hasNoNext) emit('change-slide', event, 'next')
    }

    function clickPrevious(event: MouseEvent|TouchEvent) {
      event.stopPropagation()
      if (!props.hasNoPrevious) emit('change-slide', event, 'previous')
    }

    return {
      clickNext,
      clickPrevious,
    }
  },
})
</script>

<style lang="sass">
$navigation-size: 50px
$navigation-icon-size: 30px

.navigation
  top: 50%
  width: 100%
  z-index: 101
  display: flex
  position: absolute
  transform: translateY(-50%)
  justify-content: space-between

  &__cta
    padding: 0
    color: white
    border: none
    display: flex
    outline: none
    cursor: pointer
    align-items: center
    justify-content: center
    width: $navigation-size
    height: $navigation-size
    background-color: rgba(black, .8)

    &:focus
      @extend .outline

    &--disabled
      cursor: not-allowed
      background-color: rgba(#BBB, .8)

  &__icon
    width: $navigation-icon-size
    height: $navigation-icon-size
    min-width: $navigation-icon-size
    min-height: $navigation-icon-size
</style>
