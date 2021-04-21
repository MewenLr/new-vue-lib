<template>
  <div class="fake">
    Fake component
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Fake',
  components: {
  },
  props: {
  },
  setup() {

    return {
    }
  },
})
</script>

<style lang="sass">
.fake
</style>
