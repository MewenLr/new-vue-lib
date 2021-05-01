import { DirectiveBinding } from 'vue'
import DirectiveElement from './directive-element.i'

export default {
  mounted: (el: DirectiveElement, binding: DirectiveBinding): void => {
    el.eventFn = (event) => binding.value(event)
    window.addEventListener('resize', el.eventFn)
  },
  unmounted: (el: DirectiveElement): void => {
    window.removeEventListener('resize', el.eventFn as EventListener)
  },
}
