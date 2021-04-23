<template>
  <div
    data-alert
    class="alert"
  >
    <Placeholder
      class="alert__icon"
    />
    <span
      data-title
      class="alert__title"
      v-if="alert && alert.title"
    >
      {{ alert.title }}
    </span>
    <button
      data-close
      class="alert__close"
      aria-label="Close alert"
      v-if="closable"
      @click="$emit('close')"
    >
      <Placeholder
        class="alert__close-icon"
      />
    </button>
    <div
      data-description
      class="alert__description"
      v-if="alert && alert.description"
    >
      {{ alert.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import Placeholder from '../Placeholder.vue'

const variantValidator = ['success', 'error', 'warning', 'info']

export default defineComponent({
  name: 'Alert',
  components: {
    Placeholder,
  },
  props: {
    delay: { type: Number, default: 0 },
    alert: { type: Object, required: true },
    closable: { type: Boolean, default: true },
    variant: {
      type: String,
      default: 'success',
      validator: (prop: string): boolean => variantValidator.includes(prop),
    },
  },
  emits: [
    'close',
  ],
  setup(props: { delay: number }, { emit }) {

    watch(
      () => props.delay,
      () => props.delay > 0 && setTimeout(() => emit('close'), props.delay),
      { immediate: true },
    )

    return {
    }
  },
})
</script>

<style>
.alert {
  width: 300px;
  min-height: 100px;
  position: relative;
  padding-left: 50px;
  background-color: white;
  border: 1px solid #35495e;
}

.alert__icon {
  top: 10px;
  left: 10px;
  position: absolute;
}

.alert__close {
  top: 10px;
  right: 10px;
  display: flex;
  min-width: 24px;
  min-height: 24px;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
}
</style>
