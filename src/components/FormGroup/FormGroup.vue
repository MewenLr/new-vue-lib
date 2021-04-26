<template>
  <div
    data-form-group
    class="form-group"
    :class="`form-group--label-${labelPosition}`"
  >
    <label
      data-label
      :for="groupFor"
      v-if="label"
    >
      {{ label }}
    </label>
    <div class="form-group__input">
      <slot />
      <InputError
        data-error
        input-form
        :id="groupFor"
        :value="value"
        :immediate="immediate"
        :validator="validator"
        v-if="validator"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputError from '../InputError/InputError.vue'

export default defineComponent({
  name: 'FormGroup',
  components: {
    InputError,
  },
  props: {
    label: { type: String, default: null },
    groupFor: { type: String, required: true },
    validator: { type: Object, default: null },
    immediate: { type: Boolean, default: false },
    value: { type: [String, Boolean], default: null },
    labelPosition: {
      type: String,
      default: 'left',
      validator: (prop: string) => ['left', 'top', 'right'].includes(prop),
    },
  },
})
</script>

<style>
.form-group {
  display: flex;
}

.form-group--label-left {
  flex-direction: row;
}

.form-group--label-right {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

.form-group--label-top {
  align-items: initial;
  flex-direction: column;
}
</style>

