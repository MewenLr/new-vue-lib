<template>
  <transition name="fade">
    <Veil v-if="opened" />
  </transition>
  <transition :name="animation">
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
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Veil from '../Veil/Veil.vue'

export default defineComponent({
  name: 'Modal',
  components: {
    Veil,
  },
  props: {
    opened: { type: Boolean, default: false },
    animation: { type: String, default: 'fade' },
  },
})
</script>

<style>
@import url('../../styles/animations.css');

.modal {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
  display: flex;
  position: fixed;
  flex-direction: column;
  background-color: white;
  width: auto;
  height: auto;
  max-width: 400px;
  max-height: 200px;
}
</style>
