<template>
  <div
    data-veil
    class="veil"
    appear="true"
  />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import modVeil from '@/scripts/store/modVeil/modVeil'

export default defineComponent({
  name: 'Veil',
  props: {
    opened: { type: Boolean, default: false },
  },
  setup(props: { opened: boolean }) {

    const { updateVeilOpen } = modVeil()

    watch(
      () => props.opened,
      () => updateVeilOpen(props.opened),
    )
  },
})
</script>

<style lang="sass">
.veil
  top: 0
  left: 0
  width: 100%
  height: 100%
  position: fixed
  z-index: $z-index-veil
  background-color: rgba(black, 0.5)
</style>
