<template>
  <div
    data-checkbox
    class="checkbox"
    :class="[
      isFocused && 'checkbox--focused',
      isChecked && 'checkbox--checked',
      `checkbox--label-${labelPosition}`
    ]"
  >
    <label
      class="checkbox__label"
      :for="id"
    >
      {{ label }}
    </label>
    <div class="checkbox__box">
      <input
        data-input
        ref="checkbox"
        type="checkbox"
        class="checkbox__input"
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
  name: 'Checkbox',
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
    const checkbox = ref<HTMLInputElement|null>(null)

    function checkboxCases(): void {

      switch(true) {

        case typeof props.modelValue === 'boolean':

          (checkbox.value as HTMLInputElement).checked = props.modelValue as boolean
          isChecked.value = props.modelValue as boolean

          action.value = (event: Event) => {
            isChecked.value = (event.target as HTMLInputElement)?.checked
            emit('click', event)
            emit('update:modelValue', isChecked.value)
          }
          break

        case props.modelValue instanceof Array:

          (checkbox.value as HTMLInputElement).checked = (props.modelValue as string[]).includes(props.value)
          isChecked.value = (props.modelValue as string[]).includes(props.value)

          action.value = (event: Event) => {
            emit('click', event)
            const model = props.modelValue as string[]
            if (!isChecked.value) return emit('update:modelValue', [...model, (event.target as HTMLInputElement)?.value])
            return emit('update:modelValue', model.filter((el) => el !== props.value))
          }
          break

        default:
          console.error('[Checkbox] prop modelValue not supported')
      }
    }

    onMounted(() => checkboxCases())

    watch(
      () => props.modelValue,
      () => checkboxCases(),
    )

    function toggleFocus(event: Event, hasFocused: boolean): void {
      isFocused.value = hasFocused
      return emit(event.type as 'focus'|'blur', event)
    }

    return {
      action,
      checkbox,
      isFocused,
      isChecked,
      toggleFocus,
    }
  },
})
</script>

<style>
.checkbox {
  display: flex;
}

.checkbox__box {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: lightgray;
}

.checkbox__input {
  margin: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  appearance: none;
}

.checkbox--focused .checkbox__box {
  background-color: lightseagreen;
}

.checkbox--checked .checkbox__box {
  background-color: seagreen;
}

.checkbox--label-left .checkbox__main {
  align-items: center;
  flex-direction: row;
}

.checkbox--label-right .checkbox__main {
  align-items: center;
  justify-content: flex-end;
  flex-direction: row-reverse;
}
</style>
