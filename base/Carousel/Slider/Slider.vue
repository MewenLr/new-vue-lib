<script lang="ts">
import { defineComponent, h, onBeforeMount, VNode } from 'vue'

export default defineComponent({
  name: 'Slider',
  props: {
    isInfinite: { type: Boolean, default: false },
  },
  setup: (props: { isInfinite: boolean }, { slots }) => {

    onBeforeMount((): false|void => !slots.default && console.error('Slider requires a default slot.'))

    function renderSlides() {
      const extendedSlides: VNode[] = []
      const slides = (slots.default ? slots.default() : []) as unknown as VNode
      if (props.isInfinite) {
        ['before', 'current', 'after'].forEach(() => extendedSlides.push(slides))
        return extendedSlides
      }
      return slides
    }

    return () => h('ul', { class: 'slider' }, renderSlides())
  },
})
</script>
