<template>
  <div
    data-input
    class="input"
    :class="[
      icon && 'input--icon',
      reversed && 'input--reversed',
      isFocused && 'input--focused',
      action && action.reversed && 'input--reversed-action',
    ]"
  >
    <Cta
      data-action
      class="input__action"
      :tag="cta"
      :aria-label="action.label"
      v-if="action && action.icon && !action.reversed"
      @click="$emit('click', $event)"
    >
      <Placeholder />
    </Cta>
    <div class="input__bar">
      <input
        data-field
        class="input__field"
        :id="id"
        :type="type"
        :value="modelValue"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly && 'readonly'"
        :autocomplete="!autocomplete && 'off'"
        @blur="toggleFocus($event, false)"
        @focus="toggleFocus($event, true)"
        @keyup="$emit('keyup', $event)"
        @keydown="$emit('keydown', $event)"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <Placeholder
        class="input__icon"
        v-if="icon"
      />
    </div>
    <Cta
      data-action-reversed
      class="input__action"
      :tag="cta"
      :aria-label="action.label"
      v-if="action && action.icon && action.reversed"
      @click="$emit('click', $event)"
    >
      <Placeholder />
    </Cta>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Cta from '../Cta/Cta.vue'
import Placeholder from '../Placeholder.vue'

interface Action {
  icon: string;
  label: string;
  reversed: boolean;
}

export default defineComponent({
  name: 'Input',
  components: {
    Cta,
    Placeholder,
  },
  props: {
    id: { type: String, required: true },
    icon: { type: String, default: null },
    modelValue: { type: String, default: '' },
    readonly: { type: Boolean, default: null },
    reversed: { type: Boolean, default: null },
    required: { type: Boolean, default: null },
    placeholder: { type: String, default: null },
    autocomplete: { type: Boolean, default: null },
    cta: {
      type: String,
      default: 'button',
      validator: (prop: string) => ['div', 'button'].includes(prop),
    },
    action: {
      type: Object,
      default: null,
      validator: (prop: Action) => (typeof prop.icon === 'string') && true,
    },
    type: {
      type: String,
      default: 'text',
      validator: (prop: string): boolean => ['text', 'number', 'email', 'password'].includes(prop),
    },
  },
  emits: [
    'blur',
    'focus',
    'click',
    'keyup',
    'keydown',
    'update:modelValue',
  ],
  setup(_, { emit }) {

    const isFocused = ref<boolean>(false)

    function toggleFocus(event: Event, hasFocused: boolean): void {
      isFocused.value = hasFocused
      return emit(event.type as 'focus'|'blur', event)
    }

    return {
      isFocused,
      toggleFocus,
    }
  },
})
</script>

<style>
.input {
  width: 100%;
  display: flex;
}

.input__action {
  background-color: lightgrey;
}

.input__bar {
  width: 100%;
  display: flex;
  min-height: 24px;
  position: relative;
  background-color: white;
}

.input__field {
  width: 100%;
  padding: 0 24px 0 0;
}

.input__icon {
  right: 0;
  position: absolute;
  pointer-events: none;
}

.input--reversed .input__bar {
  flex-direction: row-reverse;
}

.input--reversed .input__field {
  padding: 0 0 0 24px;
}

.input--reversed .input__icon {
  left: 0;
  right: initial;
}
</style>
