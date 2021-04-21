<template>
  <div
    data-label-input
    class="label-input"
    :class="`label-input--label-${labelPosition}`"
  >
    <label
      data-label
      class="label-input__label"
      :for="labelFor"
      v-if="label"
    >
      {{ label }}
    </label>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { labelPositionValidator } from '@/scripts/validators'

export default defineComponent({
  name: 'LabelInput',
  props: {
    label: { type: String, required: true },
    labelFor: { type: String, default: null },
    labelPosition: {
      type: String,
      default: 'left',
      validator: (prop: string): boolean => labelPositionValidator(prop),
    },
  },
  setup(props, { slots }) {
    onBeforeMount((): false|void => !slots.default && console.error('LabelInput requires Input as default slot.'))
  },
})
</script>

<style lang="sass">
$input-label-margin: 10px

.label-input
  $self: &
  width: 100%
  display: inline-flex
  align-items: baseline

  &__label
    min-width: fit-content

  &--label-top
    flex-direction: column

    #{ $self }__label
      margin-bottom: $input-label-margin

  &--label-right
    justify-content: flex-end
    flex-direction: row-reverse

    #{ $self }__label
      margin-left: $input-label-margin

  &--label-left
    flex-direction: row

    #{ $self }__label
      margin-right: $input-label-margin
</style>
