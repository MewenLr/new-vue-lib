<template>
  <Animate>
    <div
      data-alert
      class="alert"
      :class="[
        `alert--${variant}`,
        closable && 'alert--closable',
      ]"
      v-if="opened"
    >
      <div>
        <SvgIcon
          data-icon
          variant="white"
          class="alert__icon"
          :icon="icons[variant]"
        />
        <span class="alert__title">
          {{ alert.title }}
        </span>
        <button
          data-close
          class="alert__close"
          aria-label="Close alert"
          v-if="closable"
          @click="$emit('close')"
        >
          <SvgIcon
            icon="cross"
            variant="white"
            class="alert__close-icon"
          />
        </button>
      </div>
      <div class="alert__description">
        {{ alert.description }}
      </div>
    </div>
  </Animate>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import modAlert from './modAlert'

interface Props {
  delay: number;
  variant: string;
  closable: boolean;
}

const variantValidator = ['success', 'error', 'warning', 'info']

export default defineComponent({
  name: 'Alert',
  components: {
    SvgIcon,
  },
  inheritAttrs: false,
  props: {
    delay: { type: Number, default: 0 },
    alert: { type: Object, required: true },
    opened: { type: Boolean, default: false },
    closable: { type: Boolean, default: false },
    variant: {
      type: String,
      default: 'success',
      validator: (prop: string): boolean => variantValidator.includes(prop),
    },
  },
  setup(props: Props, { emit }) {

    const icons = {
      success: 'round-check',
      warning: 'round-warn',
      error: 'round-x',
      info: 'round-info',
    }

    onMounted(() => props.delay > 0 && setTimeout(() => emit('close'), props.delay))

    return {
      icons,
    }
  },
})
</script>

<style lang="sass">
$alert-height: 100px
$alert-padding-x: 20px
$alert-icon-size: 1rem
$alert-cta-size: 1.5rem

.alert
  width: 300px
  color: white
  display: flex
  position: relative
  height: $alert-height
  border-radius: $radius-m

  &__icon
    top: 50%
    position: absolute
    left: $alert-padding-x
    width: $alert-icon-size
    height: $alert-icon-size
    transform: translateY(-50%)

  &__description
    width: 100%
    display: block
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
    width: $alert-cta-size
    height: $alert-cta-size
    justify-content: center
    right: $alert-padding-x
    min-width: $alert-cta-size
    min-height: $alert-cta-size
    transform: translateY(-50%)
    background-color: transparent

    &:focus
      @extend .outline

  &__close-icon
    width: $alert-icon-size
    height: $alert-icon-size

  /* variant */

  &--success
    background-color: $success

  &--error
    background-color: $error

  &--warning
    background-color: $warning

  &--info
    background-color: $info
</style>
