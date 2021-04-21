<template>
  <div
    data-chip
    class="chip"
    :class="`chip--${variant}`"
  >
    <div class="chip__label">
      {{ label }}
    </div>
    <button
      data-close
      class="chip__close"
      aria-label="Close chip"
      v-if="closable"
      @click="$emit('close', $event)"
    >
      <SvgIcon
        icon="cross"
        class="chip__close-icon"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

const variantValidator = ['primary', 'secondary', 'tertiary']

export default defineComponent({
  name: 'Chip',
  components: {
    SvgIcon,
  },
  props: {
    label: { type: String, required: true },
    closable: { type: Boolean, default: false },
    variant: {
      type: String,
      default: 'primary',
      validator: (prop: string): boolean => variantValidator.includes(prop),
    },
  },
  emits: [
    'close',
  ],
})
</script>

<style lang="sass">
$chip-padding-x: 16px
$chip-icon-size: 1.5rem

.chip
  $self: &
  display: flex
  max-width: 200px
  position: relative
  align-items: center
  border-radius: $radius-m
  padding: 8px $chip-padding-x
  padding-right: calc(#{$chip-icon-size} + #{$chip-padding-x * 2})

  &__label
    width: 100%
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis

  &__close
    top: 50%
    margin: 0
    padding: 0
    border: none
    outline: none
    display: flex
    cursor: pointer
    position: absolute
    align-items: center
    border-radius: inherit
    right: $chip-padding-x
    width: $chip-icon-size
    height: $chip-icon-size
    justify-content: center
    transform: translateY(-50%)
    min-width: $chip-icon-size
    min-height: $chip-icon-size
    background-color: transparent

    &:focus
      @extend .outline

  &__close-icon
    width: 50%
    height: 50%

  &--primary
    color: $primary
    border: 1px solid $primary
    background-color: $background

    #{ $self }__icon
      fill: $primary

  &--secondary
    color: $secondary
    border: 1px solid $secondary
    background-color: $background

    #{ $self }__icon
      fill: $secondary

  &--tertiary
    color: $tertiary
    border: 1px solid $tertiary
    background-color: $background

    #{ $self }__icon
      fill: $tertiary
</style>
