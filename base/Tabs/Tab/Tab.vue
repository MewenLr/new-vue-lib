<template>
  <div
    class="tab"
    v-show="title === selectedTitle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'Tab',
  props: {
    title: { type: String, required: true },
  },
  setup() {

    const selectedTitle = inject('selectedTitle')

    return {
      selectedTitle,
    }
  },
})
</script>

<style lang="sass">
.tab
</style>
