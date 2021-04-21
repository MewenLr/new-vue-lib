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
    <div
      data-main
      class="checkbox__main"
    >
      <label
        data-label
        class="checkbox__label"
        :for="labelFor && id"
      >
        {{ label }}
      </label>
      <div class="checkbox__box">
        <span
          data-check
          class="checkbox__check"
        />
        <input
          data-input
          ref="checkbox"
          type="checkbox"
          class="checkbox__input"
          :id="id"
          :value="value"
          @click="onClick($event.target)"
          @blur="toggleFocus($event, false)"
          @focus="toggleFocus($event, true)"
        >
      </div>
    </div>
    <div
      data-error
      class="checkbox__error"
      v-if="validators"
    >
      {{ isErrorVisible ? errorMsg : '' }}
    </div>
  </div>
</template>

<script lang="ts">
import { Validators } from '@/scripts/contracts/interfaces'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { labelPositionValidator, inputErrorValidator } from '@/scripts/validators'
import useInputError from '@/scripts/hooks/useInputError/useInputError'

interface Props {
  id: string;
  value: string;
  errorFlow: string;
  formInput: boolean;
  validators: Validators;
  modelValue: unknown[]|boolean;
}

export default defineComponent({
  name: 'Checkbox',
  components: {
  },
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    labelFor: { type: Boolean, default: false },
    formInput: { type: Boolean, default: false },
    modelValue: { type: [Boolean, Array], required: true },
    errorFlow: {
      type: String,
      default: 'immediate',
      validator: (prop: string) => ['blurred', 'immediate'].includes(prop),
    },
    labelPosition: {
      type: String,
      default: 'right',
      validator: (prop: string): boolean => labelPositionValidator(prop),
    },
    validators: {
      type: Object,
      default: null,
      validator: (prop: Validators) => Object
        .keys(prop)
        .every((el: string): boolean => inputErrorValidator(el)),
    },
  },
  emits: [
    'blur',
    'focus',
    'update:modelValue',
  ],
  setup(props: Props, { emit }) {

    const isFocused = ref<boolean>(false)
    const isChecked = ref<boolean>(false)
    const checkbox = ref<HTMLInputElement|null>(null)

    function toggleFocus(event: Event, hasFocused: boolean): void {
      isFocused.value = hasFocused
      return emit(event.type as 'blur'|'focus', event)
    }

    function onClick(target: HTMLInputElement): void|false {
      isChecked.value = target?.checked
      if (typeof props.modelValue === 'boolean') return emit('update:modelValue', isChecked.value)
      if (props.modelValue instanceof Array) {
        const model = [...props.modelValue]
        if (isChecked.value) return emit('update:modelValue', [...model, target?.value])
        return emit('update:modelValue', model.filter((el) => el !== props.value))
      }
      return false
    }

    function updateCheckbox(): boolean {
      if (checkbox.value && props.modelValue instanceof Array) {
        isChecked.value = props.modelValue.includes(props.value)
        return checkbox.value.checked = props.modelValue.includes(props.value)
      }
      if (checkbox.value && typeof props.modelValue === 'boolean') {
        isChecked.value = props.modelValue
        return checkbox.value.checked = props.modelValue
      }
      return false
    }

    onMounted(() => {
      watch(
        () => props.modelValue,
        () => updateCheckbox(),
        { immediate: true },
      )
    })

    const { errorMsg, isErrorVisible } = useInputError(props)

    watch(
      () => isFocused.value,
      () => isErrorVisible.value = (props.errorFlow === 'immediate') || (!isFocused.value && props.errorFlow === 'blurred'),
    )

    return {
      onClick,
      checkbox,
      errorMsg,
      isFocused,
      isChecked,
      toggleFocus,
      isErrorVisible,
    }
  },
})
</script>

<style lang="sass">
$checkbox-size: 1rem
$checkbox-label-margin: 10px

.checkbox
  $self: &

  &__main
    display: inline-flex

  &__box
    display: flex
    position: relative
    align-items: center
    width: $checkbox-size
    height: $checkbox-size
    justify-content: center
    border-radius: $radius-m
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

  &__error
    color: red
    font-size: $font-m
    min-height: 1.5rem

  &--focused

    #{ $self }__box
      @extend .outline

  &--checked

    #{ $self }__check
      visibility: visible

  &--label-right

    #{ $self }__main
      justify-content: flex-end
      flex-direction: row-reverse

    #{ $self }__label
      margin-left: $checkbox-label-margin

  &--label-left

    #{ $self }__main
      flex-direction: row

    #{ $self }__label
      margin-right: $checkbox-label-margin
</style>
