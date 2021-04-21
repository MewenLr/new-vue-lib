<template>
  <Animate name="fade">
    <Veil v-if="opened" />
  </Animate>
  <Animate :name="animation">
    <div
      data-modal
      class="modal"
      v-if="opened"
    >
      <header
        data-header
        class="modal__header"
        v-if="$slots.header"
      >
        <slot name="header" />
      </header>
      <main class="modal__main">
        <slot />
      </main>
      <footer
        data-footer
        class="modal__footer"
        v-if="$slots.footer"
      >
        <slot name="footer" />
      </footer>
    </div>
  </Animate>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import Veil from '@/components/Veil/Veil.vue'
import Animate from '@/components/Animate/Animate.vue'

export default defineComponent({
  name: 'Modal',
  components: {
    Veil,
    Animate,
  },
  props: {
    opened: { type: Boolean, default: false },
    animation: { type: String, default: 'fade' },
  },
  setup(_, { slots }) {

    onBeforeMount((): false|void => !slots.default && console.error('Modal requires a default slot.'))

  },
})
</script>

<style lang="sass">
.modal
  top: 0
  left: 0
  right: 0
  bottom: 0
  width: 100%
  height: 100%
  margin: auto
  display: flex
  padding: 20px
  position: fixed
  max-width: 100%
  max-height: 100%
  z-index: $z-index-veil
  flex-direction: column
  border-radius: $radius-m
  background-color: $background

  &__header
    margin-bottom: 20px

  &__footer
    margin-top: auto
    align-self: flex-end

  @include tablet
    width: auto
    height: auto
    max-width: 400px
    max-height: 200px

  @include laptop
    max-width: 500px
    max-height: 300px
</style>
