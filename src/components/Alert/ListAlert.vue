<template>
  <div class="list-alert">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListAlert',
})
</script>

<style>
.list-alert {
  top: 25px;
  right: 25px;
  position: fixed;
}

.alert {
  margin-bottom: 10px;
}
</style>
