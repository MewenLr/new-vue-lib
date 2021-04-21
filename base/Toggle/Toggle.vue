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
    <div
      data-main
      class="checkbox__main"
    >
      <label
        data-label
        class="toggle__label"
        :for="labelFor && id"
      >
        {{ label }}
      </label>
      <div class="toggle__box">
        <span
          data-check
          class="toggle__check"
        />
        <input
          data-input
          ref="toggle"
          type="checkbox"
          class="toggle__input"
          :id="id"
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
  errorFlow: string;
  formInput: boolean;
  modelValue: boolean;
  validators: Validators;
}

export default defineComponent({
  name: 'Toggle',
  components: {
  },
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    labelFor: { type: Boolean, default: false },
    formInput: { type: Boolean, default: false },
    modelValue: { type: Boolean, required: true },
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
    const toggle = ref<HTMLInputElement|null>(null)

    function toggleFocus(event: Event, hasFocused: boolean): void {
      isFocused.value = hasFocused
      return emit(event.type as 'blur'|'focus', event)
    }

    function onClick(target: HTMLInputElement): void {
      isChecked.value = target.checked
      return emit('update:modelValue', isChecked.value)
    }

    function updateToggle(): boolean {
      if (toggle.value) {
        isChecked.value = props.modelValue
        return toggle.value.checked = props.modelValue
      }
      return false
    }

    onMounted(() => {
      watch(
        () => props.modelValue,
        () => updateToggle(),
        { immediate: true },
      )
    })

    const { errorMsg, isErrorVisible } = useInputError(props)

    watch(
      () => isFocused.value,
      () => isErrorVisible.value = (props.errorFlow === 'immediate') || (!isFocused.value && props.errorFlow === 'blurred'),
    )

    return {
      toggle,
      onClick,
      errorMsg,
      isChecked,
      isFocused,
      toggleFocus,
      isErrorVisible,
    }
  },
})
</script>

<style lang="sass">
$toggle-padding: 2px
$toggle-label-margin: 10px
$toggle-translation: calc(100% + #{$toggle-padding})

.toggle
  $self: &

  &__main
    display: inline-flex

  &__box
    display: flex
    position: relative
    align-items: center
    border-radius: 5rem
    padding: $toggle-padding
    border: 2px solid $primary
    width: calc(2rem - #{$toggle-padding})
    height: calc(1rem - #{$toggle-padding})

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
    width: .85rem
    height: .85rem
    position: relative
    border-radius: 100%
    transform: translateX(0)
    transition: all .1s linear
    background-color: $tertiary

  &__error
    color: red
    font-size: $font-m
    min-height: $font-m

  &--focused

    #{ $self }__box
      @extend .outline

  &--checked

    #{ $self }__check
      background-color: $secondary
      transform: translateX($toggle-translation)

  &--label-right

    #{ $self }__main
      justify-content: flex-end
      flex-direction: row-reverse

    #{ $self }__label
      margin-left: $toggle-label-margin

  &--label-left

    #{ $self }__main
      flex-direction: row

    #{ $self }__label
      margin-right: $toggle-label-margin
</style>
