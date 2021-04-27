<template>
  <div
    data-veil
    class="veil"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import modVeil from './modVeil'

export default defineComponent({
  name: 'Veil',
  setup() {

    const { updateNbVeils } = modVeil()

    onMounted(() => updateNbVeils(1))

    onUnmounted(() => updateNbVeils(-1))

  },
})
</script>

<style>
.veil {
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, .5);
}
</style>


