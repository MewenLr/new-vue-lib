<template>
  <component
    data-cta
    class="cta"
    :is="cta.tag"
    :href="cta.href"
    v-bind="cta.attributes"
    @click="cta.action"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter, _RouteLocationBase } from 'vue-router'

interface Cta {
  tag: string|null;
  href: string|null;
  action: Function|null;
}

interface Props {
  tag: string;
  to: string|_RouteLocationBase|unknown;
}

export default defineComponent({
  name: 'Cta',
  components: {
  },
  props: {
    tag: {
      type: String,
      required: true,
      validator: (prop: string) => ['div', 'button', 'link', 'anchor'].includes(prop),
    },
    to: {
      default: null,
      type: [String, Object],
      validator: (prop: string|_RouteLocationBase): boolean => {
        if (typeof prop === 'string') return true
        if (typeof prop === 'object' && typeof prop?.name === 'string') return true
        return false
      },
    },
  },
  emits: [
    'click',
  ],
  setup(props: Props, { emit }) {

    const router = useRouter()

    const cta = computed<Cta>(() => {

      let tag: string|null = null
      let href: string|null = null
      let action: Function|null = null
      let attributes: object|null = null

      switch(true) {

        case props.tag === 'div':

          tag = 'div'
          action = (event: Event) => emit(event.type as 'click', event)
          break

        case props.tag === 'button':

          tag = 'button'
          action = (event: Event) => emit(event.type as 'click', event)
          break

        case (props.tag === 'link' && !!(props.to as _RouteLocationBase).name):

          tag = 'a'
          href = router.resolve({ name: (props.to  as _RouteLocationBase).name as string })?.path
          action = () => router.push(props.to as _RouteLocationBase)
          break

        case (props.tag === 'anchor' && !!props.to):

          tag = 'a'
          href = props.to as string
          attributes = { target: '_blank' }
          break

        default:
          console.error('[Cta] prop tag not supported')
      }

      return {
        tag,
        href,
        action,
        attributes,
      }
    })

    return {
      cta,
    }
  },
})
</script>
