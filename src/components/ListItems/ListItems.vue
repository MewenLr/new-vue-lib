<template>
  <div class="list-items">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListItems',
})
</script>

<style>
.list-items {
  display: flex;
  flex-direction: column;
}
</style>
