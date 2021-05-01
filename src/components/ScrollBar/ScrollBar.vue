<template>
  <div class="scroll-bar">
    <div
      ref="container"
      class="scroll-bar__container"
      @scroll="handleScroll($event.target)"
    >
      <div class="scroll-bar__content">
        <slot />
      </div>
      <div
        ref="scrollbar"
        class="scroll-bar__bar"
        :style="{
          height: `${barHeight}%`,
          transform: `translateY(${barTop}px)`,
        }"
        v-touchmouse-down="handleDragDown"
        v-touchmouse-move.global="handleDragMove"
        v-touchmouse-up.global="handleDragUp"
      />
    </div>
    <div
      class="scroll-bar__placeholder"
      @click="repositionBar($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useDrag from '../../modules/hooks/useDrag/useDrag'
import { touchmouseUp, touchmouseDown, touchmouseMove } from '@/scripts/directives'

export default defineComponent({
  name: 'ScrollBar',
  directives: {
    touchmouseDown,
    touchmouseMove,
    touchmouseUp,
  },
  setup() {

    const container = ref<HTMLElement|null>(null)
    const scrollbar = ref<HTMLElement|null>(null)

    /* handle scroll */

    const barTop = ref<number>(0)
    const barHeight = ref<number>(0)

    function handleScroll(element: HTMLElement) {
      const { scrollTop, clientHeight, scrollHeight } = element
      const ratioScrollTop = scrollTop / (scrollHeight / clientHeight)
      barTop.value = scrollTop + ratioScrollTop
    }

    watch(
      () => container.value,
      () => {
        if (container.value) {
          const { clientHeight, scrollHeight } = container.value
          barHeight.value = clientHeight / scrollHeight * 100
          handleScroll(container.value)
        }
      },
      { immediate: true },
    )

    /* drag bar */

    const { doDrag, stopDrag, startDrag, startPointY, clientY } = useDrag()

    const scrollBarTop = ref<number>(0)

    const setScrollBarTop = () => {
      if (scrollbar.value && startPointY.value) {
        scrollBarTop.value = startPointY.value - scrollbar.value.getBoundingClientRect().top
      }
    }

    const handleDragDown = (event: MouseEvent|TouchEvent) => startDrag({
      event,
      callback: setScrollBarTop,
      offsetWidth: container.value?.offsetWidth,
      offsetHeight: container.value?.offsetHeight,
    })
    const handleDragMove = (event: MouseEvent|TouchEvent) => doDrag(event)
    const handleDragUp = (event: MouseEvent|TouchEvent) => stopDrag(event)

    watch(
      () => clientY.value,
      () => {
        if (container.value && clientY.value) {
          const containerTop = container.value.getBoundingClientRect().top
          const gap = clientY.value - containerTop
          const { clientHeight, scrollHeight } = container.value
          container.value.scrollTo({ top: ((gap - scrollBarTop.value) / clientHeight) * scrollHeight })
        }
      },
    )

    /* reposition bar */

    function repositionBar(event: MouseEvent|TouchEvent) {
      if (container.value) {
        const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY
        const { clientHeight, scrollHeight } = container.value
        const containerTop = container.value.getBoundingClientRect().top
        const gap = (clientY - containerTop) / clientHeight * scrollHeight
        const midBarHeight= ((barHeight.value / 100) * scrollHeight) / 2
        container.value.scrollTo({ top: gap - midBarHeight, behavior: 'smooth' })
      }
    }

    return {
      barTop,
      container,
      scrollbar,
      barHeight,
      handleScroll,

      doDrag,
      stopDrag,
      startDrag,

      touchmouseUp,
      touchmouseDown,
      touchmouseMove,
      handleDragDown,
      handleDragMove,
      handleDragUp,

      repositionBar,
    }
  },
})
</script>

<style>
.scroll-bar {
  overflow: hidden;
  position: relative;
}

.scroll-bar__container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
  padding-right: 17px;
  box-sizing: content-box;
}

.scroll-bar__content {
  padding-right: 20px;
}

.scroll-bar__bar {
  top: 0;
  z-index: 2;
  width: 20px;
  right: 17px;
  height: 50px;
  position: absolute;
  background-color: seagreen;
}

.scroll-bar__placeholder {
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  position: absolute;
  background-color: lightseagreen;
}
</style>
