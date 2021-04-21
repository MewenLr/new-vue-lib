<template>
  <component
    data-bond
    class="bond"
    :to="!isAnchor ? to : null"
    :href="isAnchor ? to : routePath"
    :is="isAnchor ? 'a' : 'router-link'"
    :target="isAnchor ? '_blank' : '_self'"
    :class="[
      `bond--${variant}`,
      reversed && 'bond--reversed',
    ]"
  >
    <SvgIcon
      class="bond__icon"
      :icon="icon"
      v-if="icon"
    />
    <slot />
  </component>
</template>

<script lang="ts">
import { variantValidator } from '@/scripts/validators'
import { useRouter, _RouteLocationBase } from 'vue-router'
import { computed, defineComponent, onBeforeMount } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

/**
 * @desc Bond component
 * [props.to]
 * string for anchor (ex. https://www.google.com/)
 * object for router-link (ex. { name: 'index', ... })
 */
export default defineComponent({
  name: 'Bond',
  components: {
    SvgIcon,
  },
  props: {
    icon: { type: String, default: '' },
    reversed: { type: Boolean, default: false },
    variant: {
      type: String,
      default: 'primary',
      validator: (prop: string): boolean => variantValidator(prop),
    },
    to: {
      required: true,
      type: [String, Object],
      validator: (prop: string|_RouteLocationBase): boolean => {
        if (typeof prop === 'string') return true
        if (typeof prop === 'object' && typeof prop?.name === 'string') return true
        return false
      },
    },
  },
  setup(props: { to: unknown|_RouteLocationBase }, { slots }) {

    onBeforeMount((): false|void => !slots.default && console.error('Bond requires a default slot.'))

    const router = useRouter()

    const isAnchor = computed<boolean>(() => typeof props.to === 'string')

    const routePath = computed<string|null>(() => {
      if (typeof props?.to === 'object') {
        const route = props?.to as _RouteLocationBase
        return router.resolve({ name: route.name } as _RouteLocationBase)?.path
      }
      return null
    })

    return {
      isAnchor,
      routePath,
    }
  },
})
</script>

<style lang="sass">
$bond-margin: 5px
$bond-icon-size: 1rem

.bond
  $self: &
  outline: none
  cursor: pointer
  flex-direction: row
  display: inline-flex
  text-decoration: none
  align-items: baseline
  border-radius: $radius-m

  &:hover
    filter: brightness(1.5)
    text-decoration: underline

  &:focus
    @extend .outline

  &__icon
    width: $bond-icon-size
    height: $bond-icon-size
    margin-right: $bond-margin

  &--reversed
    flex-direction: row-reverse

    #{ $self }__icon
      margin-right: 0
      margin-left: $bond-margin

  &--primary
    color: $primary

    #{ $self }__icon
      fill: $primary

  &--secondary
    color: $secondary

    #{ $self }__icon
      fill: $secondary

  &--tertiary
    color: $tertiary

    #{ $self }__icon
      fill: $tertiary
</style>
