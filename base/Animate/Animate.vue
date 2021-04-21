<template>
  <transition
    data-animate
    :mode="mode"
    :name="name"
    :enter-active-class="`${name}-active`"
    :leave-active-class="`${name}-active`"
    :leave-to-class="hasScopeLeave ? name : ''"
    :enter-from-class="hasScopeEnter ? name : ''"
    @enter="enter"
    @leave="leave"
    @leave-enter="afterEnter"
    @leave-leave="afterLeave"
    @before-enter="beforeEnter"
    @before-leave="beforeLeave"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

interface Props {
  scope: string;
  duration: number|unknown[];
  timingFunction: string|null;
  delay: number|unknown[]|null;
}

const nameValidator = ['fade', 'slide-right']
const scopeValidator = ['enter-leave', 'enter', 'leave']
const timingFunctionValidator = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']

export default defineComponent({
  name: 'Animate',
  props: {
    delay: {
      type: [Number, Array],
      default: null,
      validator: (prop: number|number[]) => {
        if (prop === null) return true
        if (typeof prop === 'number') return prop >= 0
        if (prop instanceof Array) return prop.every((el: number) => el >= 0) && prop.length === 2
        return false
      },
    },
    duration: {
      type: [Number, Array],
      default: 500,
      validator: (prop: number|number[]) => {
        if (typeof prop === 'number') return prop >= 0
        if (prop instanceof Array) return prop.every((el: number) => el >= 0) && prop.length === 2
        return false
      },
    },
    name: {
      type: String,
      required: true,
      validator: (prop: string) => nameValidator.includes(prop),
    },
    scope: {
      type: String,
      default: 'enter-leave',
      validator: (prop: string) => scopeValidator.includes(prop),
    },
    timingFunction: {
      type: String,
      default: 'linear',
      validator: (prop: string) => timingFunctionValidator.includes(prop),
    },
    mode: {
      type: String,
      default: null,
      validator: (prop: string) => ['in-out', 'out-in'].includes(prop),
    },
  },
  emits: [
    'in',
    'out',
    'after-in',
    'after-out',
    'before-in',
    'before-out',
  ],
  setup(props: Props, { emit }) {

    const hasScopeEnter = computed<boolean>(() => props.scope === 'enter-leave' || props.scope === 'enter')
    const hasScopeLeave = computed<boolean>(() => props.scope === 'enter-leave' || props.scope === 'leave')

    function removeStyles(el: HTMLElement) {
      if (props.timingFunction) el.style.transitionTimingFunction = ''
      if (props.duration >= 0 || props.duration instanceof Array) el.style.transitionDuration = ''
      if (props.delay && (props.delay >= 0 || props.delay instanceof Array)) el.style.transitionDelay = ''
    }

    const beforeEnter = (el: HTMLElement) => {
      if (props.duration >= 0) el.style.transitionDuration = `${props.duration}ms`
      if (props.duration instanceof Array) el.style.transitionDuration = `${props.duration[0]}ms`
      if (props.delay && props.delay >= 0) el.style.transitionDelay = `${props.delay}ms`
      if (props.delay && props.delay instanceof Array) el.style.transitionDelay = `${props.delay[0]}ms`
      if (props.timingFunction) el.style.transitionTimingFunction = props.timingFunction
      return emit('before-in', el)
    }

    const enter = (el: HTMLElement) => emit('in', el)

    const afterEnter = (el: HTMLElement) => {
      if (props.delay instanceof Array) el.style.transitionDelay = ''
      if (props.duration instanceof Array) el.style.transitionDuration = ''
      return emit('after-in', el)
    }

    const beforeLeave = (el: HTMLElement) => {
      if (props.delay instanceof Array) el.style.transitionDelay = `${props.delay[1]}ms`
      if (props.duration instanceof Array) el.style.transitionDuration = `${props.duration[1]}ms`
      return emit('before-out', el)
    }

    const leave = (el: HTMLElement) => emit('out', el)

    const afterLeave = (el: HTMLElement) => {
      removeStyles(el)
      return emit('after-out', el)
    }

    return {
      enter,
      leave,
      afterEnter,
      afterLeave,
      beforeEnter,
      beforeLeave,
      hasScopeEnter,
      hasScopeLeave,
    }
  },
})
</script>

<style lang="sass">
/* fade */

.fade-active
  transition: opacity

.fade
  opacity: 0

/* slide-right */

.slide-right-active
  transition: transform, opacity

.slide-right
  opacity: 0
  transform: translateX(50%)
</style>
