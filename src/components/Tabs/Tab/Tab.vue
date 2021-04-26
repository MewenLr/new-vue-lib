<template>
  <div
    data-tab
    class="tab"
    v-show="title === selectedTitle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'

export default defineComponent({
  name: 'Tab',
  props: {
    title: { type: String, required: true },
  },
  setup() {

    const selectedTitle = inject<Ref<string>>('selectedTitle')

    return {
      selectedTitle,
    }
  },
})
</script>
