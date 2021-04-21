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
      data-label
      class="radio__label"
      :for="labelFor && id"
    >
      {{ label }}
    </label>
    <div class="radio__box">
      <span
        data-check
        class="radio__check"
      />
      <input
        data-input
        type="radio"
        class="radio__input"
        :id="id"
        :value="value"
        @click="onClick($event.target)"
        @blur="toggleFocus($event, false)"
        @focus="toggleFocus($event, true)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { labelPositionValidator } from '@/scripts/validators'

export default defineComponent({
  name: 'Radio',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    labelFor: { type: Boolean, default: false },
    modelValue: { type: String, default: null },
    labelPosition: {
      type: String,
      default: 'right',
      validator: (prop: string): boolean => labelPositionValidator(prop),
    },
  },
  emits: [
    'blur',
    'focus',
    'update:modelValue',
  ],
  setup(props: { modelValue: string; value: string }, { emit }) {
    const isFocused = ref<boolean>(false)

    function toggleFocus(event: Event, isFocus: boolean): void {
      isFocused.value = isFocus
      return emit(event.type as 'blur'|'focus', event)
    }

    const isChecked = ref<boolean>(false)

    function onClick(target: HTMLInputElement): void|false {
      isChecked.value = target?.checked
      if (isChecked.value) return emit('update:modelValue', target?.value)
      return false
    }

    watch(
      () => props.modelValue,
      () => isChecked.value = props.modelValue === props.value,
      { immediate: true },
    )

    return {
      onClick,
      isFocused,
      isChecked,
      toggleFocus,
    }
  },
})
</script>

<style lang="sass">
$radio-size: 1rem
$radio-label-margin: 10px

.radio
  $self: &
  display: inline-flex
  border-radius: 100%

  &__box
    display: flex
    width: $radio-size
    position: relative
    align-items: center
    height: $radio-size
    border-radius: 100%
    justify-content: center
    border: 2px solid $primary

  &__input
    margin: 0
    width: 100%
    height: 100%
    border: none
    outline: none
    cursor: pointer
    appearance: none
    position: absolute

  &__check
    width: 85%
    height: 85%
    visibility: hidden
    background: $secondary
    border-radius: inherit

  &--focused

    #{ $self }__box
      @extend .outline

  &--checked

    #{ $self }__check
      visibility: visible

  &--label-right
    justify-content: flex-end
    flex-direction: row-reverse

    #{ $self }__label
      margin-left: $radio-label-margin

  &--label-left
    flex-direction: row

    #{ $self }__label
      margin-right: $radio-label-margin
</style>
