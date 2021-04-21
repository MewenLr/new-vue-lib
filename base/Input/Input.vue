<template>
  <div
    data-input
    class="input"
    :class="[
      icon && 'input--icon',
      reversed && 'input--reversed',
      iconAction && 'input--has-action',
      reversedAction && 'input--reversed-action',
    ]"
  >
    <component
      data-button-before
      class="input__cta"
      :is="ctaTag"
      :aria-label="labelAction"
      v-if="iconAction && reversedAction"
      @click="$emit('click', $event)"
      @mousedown="$emit('mousedown', $event)"
    >
      <SvgIcon
        class="input__cta-icon"
        :icon="iconAction"
        v-if="iconAction"
      />
    </component>

    <div class="input__core">
      <div class="input__bar">
        <input
          data-field
          class="input__field"
          :id="id"
          :type="type"
          :key="componentId"
          :value="modelValue"
          :required="required"
          :placeholder="placeholder"
          :readonly="readonly && 'readonly'"
          :autocomplete="!autocomplete && 'off'"
          @keyup="$emit('keyup', $event)"
          @blur="handleBlur($event)"
          @focus="toggleFocus($event, true)"
          @keydown="$emit('keydown', $event)"
          @input="$emit('update:modelValue', $event.target.value)"
        >
        <SvgIcon
          class="input__icon"
          :icon="icon"
          v-if="icon"
        />
      </div>

      <div
        data-error
        class="input__error"
        v-if="validators"
      >
        {{ isErrorVisible ? errorMsg : '' }}
      </div>
    </div>

    <component
      data-button-after
      class="input__cta"
      :is="ctaTag"
      :aria-label="labelAction"
      v-if="iconAction && !reversedAction"
      @click="$emit('click', $event)"
      @mousedown="$emit('mousedown', $event)"
    >
      <SvgIcon
        class="input__cta-icon"
        :icon="iconAction"
      />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Validators } from '@/scripts/contracts/interfaces'
import { inputValidator, inputErrorValidator } from '@/scripts/validators'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import useInputError from '@/scripts/hooks/useInputError/useInputError'

export default defineComponent({
  name: 'Input',
  components: {
    SvgIcon,
  },
  props: {
    id: { type: String, required: true },
    icon: { type: String, default: null },
    modelValue: { type: String, default: '' },
    readonly: { type: Boolean, default: null },
    required: { type: Boolean, default: false },
    reversed: { type: Boolean, default: false },
    iconAction: { type: String, default: null },
    placeholder: { type: String, default: null },
    formInput: { type: Boolean, default: false },
    labelAction: { type: String, default: null },
    autocomplete: { type: Boolean, default: null },
    reversedAction: { type: Boolean, default: false },
    errorFlow: {
      type: String,
      default: 'immediate',
      validator: (prop: string) => ['blurred', 'immediate'].includes(prop),
    },
    ctaTag: {
      type: String,
      default: 'button',
      validator: (prop: string) => ['div', 'button'].includes(prop),
    },
    type: {
      type: String,
      default: 'text',
      validator: (prop: string): boolean => inputValidator(prop),
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
    'click',
    'focus',
    'keyup',
    'keydown',
    'mousedown',
    'update:modelValue',
  ],
  setup(props, { emit }) {

    const isFocused = ref<boolean>(false)

    function toggleFocus(event: Event, hasFocused: boolean) {
      isFocused.value = hasFocused
      emit(hasFocused ? 'focus' : 'blur', event)
    }

    const { errorMsg, isErrorVisible } = useInputError(props)

    watch(
      () => [props.errorFlow, isFocused.value],
      () => isErrorVisible.value = (props.errorFlow === 'immediate') || (!isFocused.value && props.errorFlow === 'blurred'),
    )

    const componentId = ref<number>(0)

    function handleBlur(event: Event) {
      if ((event.target as HTMLInputElement).value !== props.modelValue) componentId.value += 1
      toggleFocus(event, false)
    }

    return {
      errorMsg,
      isFocused,
      toggleFocus,
      isErrorVisible,

      handleBlur,
      componentId,
    }
  },
})
</script>

<style lang="sass">
$input-height: 24px
$input-margin-y: 6px
$input-margin-x: 12px
$input-icon-size: $icon-s
$input-cta-size: $input-height + ($input-margin-y * 2) + 2px

.input
  $self: &
  width: 100%
  display: inline-flex

  &__cta
    left: -1px
    outline: none
    display: flex
    cursor: pointer
    position: relative
    align-items: center
    z-index: $z-index-m
    width: $input-cta-size
    height: $input-cta-size
    justify-content: center
    border: 1px solid $tertiary
    background-color: $background
    border-radius: 0 $radius-m $radius-m 0

    &:hover:enabled
      background-color: white

    &:focus
      @extend .outline
      z-index: $z-index-xl

  &__cta-icon
    width: $input-icon-size

  &__icon
    top: 0
    margin: 0
    padding: 0
    height: 100%
    border: none
    outline: none
    fill: $primary
    background: none
    position: absolute
    z-index: $z-index-xl
    pointer-events: none
    right: $input-margin-x
    width: $input-icon-size

  &__core
    width: 100%

  &__bar
    width: 100%
    position: relative
    display: inline-flex
    border-radius: $radius-m

  &__field
    width: 100%
    outline: none
    color: $primary
    font-size: $font-m
    height: $input-height
    border-radius: inherit
    background-color: white
    border: 1px solid $tertiary
    padding: $input-margin-y $input-margin-x

    &:focus
      @extend .outline
      border: 1px solid $outline

  &__error
    color: red
    font-size: $font-m
    min-height: $font-m

  &--icon

    #{ $self }__field
      padding-right: calc(#{$input-icon-size} + #{$input-margin-x} * 2)

  &--reversed

    #{ $self }__field
      padding-right: $input-margin-x

    &#{ $self }--icon

      #{ $self }__field
        padding-left: calc(#{$input-icon-size} + #{$input-margin-x} * 2)

    #{ $self }__icon
      right: 0
      left: $input-margin-x

  &--has-action

    #{ $self }__bar
      z-index: $z-index-l
      border-radius: $radius-m 0 0 $radius-m

  &--has-action#{ $self }--reversed-action

    #{ $self }__bar
      left: -1px
      position: relative
      border-radius: 0 $radius-m $radius-m 0

    #{ $self }__cta
      left: 0
      border-radius: $radius-m 0 0 $radius-m
</style>
