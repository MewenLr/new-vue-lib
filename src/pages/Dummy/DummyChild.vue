<template>
  <div class="fake-child">
    Dummy Child component
    <br>

    <Fetch>
      <template #error>
        Custom error message
      </template>
      <ListComments />
      <template #loading>
        Custom is loading...
      </template>
    </Fetch>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onErrorCaptured } from 'vue'
import ListComments from './ListComments.vue'
import Fetch from '../../components/Fetch/Fetch.vue'

export default defineComponent({
  name: 'DummyChild',
  components: {
    Fetch,
    ListComments,
  },
  setup() {
    const error = ref<string|unknown|null>(null)

    onErrorCaptured((e): void => {
      console.error(e)
      error.value = e
    })

    return {
      error,
    }
  },
})
</script>
