<template>
  <svg
    data-svg-icon
    class="svg-icon"
    aria-hidden="true"
    :class="`svg-icon--${variant}`"
  >
    <use
      data-use
      class="svg-icon__content"
      :xlink:href="`#icon-${icon}`"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const variantValidator = ['white', 'primary', 'secondary', 'tertiary']

export default defineComponent({
  name: 'SvgIcon',
  props: {
    icon: { type: String, required: true },
    variant: {
      type: String,
      default: 'primary',
      validator: (prop: string) => variantValidator.includes(prop),
    },
  },
})
</script>

<style lang="sass">
.svg-icon
  width: 100%
  height: 100%

  &--white
    fill: $white

  &--primary
    fill: $primary

  &--secondary
    fill: $secondary

  &--tertiary
    fill: $tertiary
</style>
