import { DirectiveBinding } from 'vue'
import DirectiveElement from './directive-element.i'

export default {
  mounted(el: DirectiveElement, binding: DirectiveBinding): void {
    el.eventFn = (event) => binding.value(event)
    el.addEventListener('click', (event) => event.stopPropagation())
    document.body.addEventListener('click', el.eventFn)
  },
  unmounted(el: DirectiveElement): void {
    el.removeEventListener('click', (event) => event.stopPropagation())
    document.body.removeEventListener('click', el.eventFn as EventListener)
  },
}
