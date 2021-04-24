<template>
  <div
    data-radio
    class="radio"
    :class="[
      isFocused && 'radio--focused',
      isChecked && 'radio--checked',
      `radio--label-${labelPosition}`
    ]"
  >
    <label
      class="radio__label"
      :for="id"
    >
      {{ label }}
    </label>
    <div class="radio__box">
      <input
        data-input
        ref="radio"
        type="radio"
        class="radio__input"
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
  modelValue: string;
}

export default defineComponent({
  name: 'Radio',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    modelValue: { type: String, required: true },
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
    const radio = ref<HTMLInputElement|null>(null)

    function radioCases(): void {

      switch(true) {

        case typeof props.modelValue === 'string':

          isChecked.value = props.modelValue === props.value

          action.value = (event: Event) => {
            isChecked.value = (event.target as HTMLInputElement)?.checked
            emit('click', event)
            if (isChecked.value) emit('update:modelValue', props.value)
          }
          break

        default:
          console.error('[Radio] prop modelValue not supported')
      }
    }

    onMounted(() => radioCases())

    watch(
      () => props.modelValue,
      () => radioCases(),
    )

    function toggleFocus(event: Event, hasFocused: boolean): void {
      isFocused.value = hasFocused
      return emit(event.type as 'focus'|'blur', event)
    }

    return {
      radio,
      action,
      isFocused,
      isChecked,
      toggleFocus,
    }
  },
})
</script>

<style>
.radio {
  display: flex;
}

.radio__box {
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 100%;
  background-color: lightgray;
}

.radio__input {
  margin: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  appearance: none;
}

.radio--focused .radio__box {
  background-color: lightseagreen;
}

.radio--checked .radio__box {
  background-color: seagreen;
}

.radio--label-left .radio__main {
  align-items: center;
  flex-direction: row;
}

.radio--label-right .radio__main {
  align-items: center;
  justify-content: flex-end;
  flex-direction: row-reverse;
}
</style>
