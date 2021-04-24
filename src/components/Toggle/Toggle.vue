<template>
  <div
    data-toggle
    class="toggle"
    :class="[
      isFocused && 'toggle--focused',
      isChecked && 'toggle--checked',
      `toggle--label-${labelPosition}`
    ]"
  >
    <label
      class="toggle__label"
      :for="id"
    >
      {{ label }}
    </label>
    <div class="toggle__box">
      <input
        data-input
        ref="toggle"
        type="checkbox"
        class="toggle__input"
        :id="id"
        :value="value"
        @click="action"
        @blur="toggleFocus($event, false)"
        @focus="toggleFocus($event, true)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

interface Props {
  value: string;
  modelValue: unknown[]|string[]|boolean;
}

export default defineComponent({
  name: 'Toggle',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    modelValue: { type: [Boolean, Array], required: true },
    labelPosition: {
      type: String,
      default: 'left',
      validator: (prop: string): boolean => ['left', 'right'].includes(prop),
    },
  },
  emits: [
    'blur',
    'focus',
    'click',
    'update:modelValue',
  ],
  setup(props: Props, { emit }) {

    const isChecked = ref<boolean>(false)
    const isFocused = ref<boolean>(false)
    const action = ref<Function|null>(null)
    const toggle = ref<HTMLInputElement|null>(null)

    function toggleCases(): void {

      switch(true) {

        case typeof props.modelValue === 'boolean':

          (toggle.value as HTMLInputElement).checked = props.modelValue as boolean
          isChecked.value = props.modelValue as boolean

          action.value = (event: Event) => {
            isChecked.value = (event.target as HTMLInputElement)?.checked
            emit('click', event)
            emit('update:modelValue', isChecked.value)
          }
          break

        default:
          console.error('[Toggle] prop modelValue not supported')
      }
    }

    onMounted(() => toggleCases())

    watch(
      () => props.modelValue,
      () => toggleCases(),
    )

    function toggleFocus(event: Event, hasFocused: boolean): void {
      isFocused.value = hasFocused
      return emit(event.type as 'focus'|'blur', event)
    }

    return {
      action,
      toggle,
      isFocused,
      isChecked,
      toggleFocus,
    }
  },
})
</script>

<style>
.toggle {
  display: flex;
}

.toggle__box {
  width: 48px;
  height: 24px;
  cursor: pointer;
  background-color: lightgray;
}

.toggle__input {
  margin: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  appearance: none;
}

.toggle--focused .toggle__box {
  background-color: lightseagreen;
}

.toggle--checked .toggle__box {
  background-color: seagreen;
}

.toggle--label-left .toggle__main {
  align-items: center;
  flex-direction: row;
}

.toggle--label-right .toggle__main {
  align-items: center;
  justify-content: flex-end;
  flex-direction: row-reverse;
}
</style>
