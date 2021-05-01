import { DirectiveBinding } from 'vue'
import DirectiveElement from './directive-element.i'

export const touchmouseDown = {
  mounted(el: DirectiveElement, binding: DirectiveBinding): void {
    el.eventFn = (event) => binding.value(event)
    const target = binding.modifiers.global ? window : el
    target.addEventListener('mousedown', el.eventFn)
    target.addEventListener('touchstart', el.eventFn)
  },
  unmounted(el: DirectiveElement, binding: DirectiveBinding): void {
    const target = binding.modifiers.global ? window : el
    target.removeEventListener('mousedown', el.eventFn as EventListener)
    target.removeEventListener('touchstart', el.eventFn as EventListener)
  },
}

export const touchmouseUp = {
  mounted(el: DirectiveElement, binding: DirectiveBinding): void {
    el.eventFn = (event) => binding.value(event)
    const target = binding.modifiers.global ? window : el
    target.addEventListener('mouseup', el.eventFn)
    target.addEventListener('touchend', el.eventFn)
  },
  unmounted(el: DirectiveElement, binding: DirectiveBinding): void {
    const target = binding.modifiers.global ? window : el
    target.removeEventListener('mouseup', el.eventFn as EventListener)
    target.removeEventListener('touchend', el.eventFn as EventListener)
  },
}

export const touchmouseMove = {
  mounted(el: DirectiveElement, binding: DirectiveBinding): void {
    el.eventFn = (event) => binding.value(event)
    const target = binding.modifiers.global ? window : el
    target.addEventListener('mousemove', el.eventFn)
    target.addEventListener('touchmove', el.eventFn)
  },
  unmounted(el: DirectiveElement, binding: DirectiveBinding): void {
    const target = binding.modifiers.global ? window : el
    target.removeEventListener('mousemove', el.eventFn as EventListener)
    target.removeEventListener('touchmove', el.eventFn as EventListener)
  },
}
