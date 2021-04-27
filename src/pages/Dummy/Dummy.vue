<template>
  <div class="dummy">
    Dummy page
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dummy',
})
</script>
