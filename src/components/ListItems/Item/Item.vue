<template>
  <Cta
    data-item
    class="item"
    :to="to"
    :tag="tag"
    @click="$emit('click', item)"
  >
    <slot />
  </Cta>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { _RouteLocationBase } from 'vue-router'
import Cta from '../../Cta/Cta.vue'

export default defineComponent({
  name: 'Item',
  components: {
    Cta,
  },
  props: {
    item: { type: Object, default: null },
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
})
</script>
