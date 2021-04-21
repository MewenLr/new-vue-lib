<template>
  <li class="slide">
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent({
  name: 'Slide',
  setup(_, { slots }) {
    onBeforeMount((): false|void => !slots.default && console.error('Slide requires a default slot.'))
  },
})
</script>

<style lang="sass">
.slide
  left: 50%
  height: 100%
  display: flex
  position: relative
  align-items: center
  justify-content: center
  transform: translateX(-50%)
</style>
