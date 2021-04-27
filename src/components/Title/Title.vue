<template>
  <component
    data-title
    class="title"
    :is="tag"
    :class="`title--${tag}`"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const tagValidator = ['h1', 'h2', 'h3']

export default defineComponent({
  name: 'Title',
  props: {
    tag: {
      type: String,
      default: 'h1',
      validator: (prop: string): boolean => tagValidator.includes(prop),
    },
  },
})
</script>

<style>
.title {
  margin: 0;
}

.title--h1 {
  font-size: 2rem;
}

.title--h2 {
  font-size: 1.5rem;
}

.title--h3 {
  font-size: 1.25rem;
}
</style>
