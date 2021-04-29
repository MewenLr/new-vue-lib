<template>
  <div
    data-error
    v-if="$slots.error && hasError"
  >
    <slot name="error" />
  </div>

  <div
    data-content
    v-else
  >
    <Suspense>
      <template #default>
        <slot />
      </template>

      <template #fallback>
        <div v-if="$slots.loading">
          <slot name="loading" />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue'

export default defineComponent({
  name: 'Fetch',
  setup() {

    const hasError = ref<Error|unknown|null>(null)

    onErrorCaptured((e: Error|unknown): void => {
      console.error(e)
      hasError.value = !!e
    })

    return {
      hasError,
    }
  },
})
</script>
