<template>
  <div
    data-error
    class="input-error"
    :class="error && 'input-error--visible'"
  >
    <span class="input-error__msg">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, Ref, ref, watch } from 'vue'

interface Validator {
  msg?: string;
  required?: boolean|{ test: boolean; msg?: string };
  min?: number|{ test: number, msg?: string };
  max?: number|{ test: number, msg?: string };
  regex?: RegExp|{ test: RegExp, msg?: string };
  custom?: Function|{ test: Function, msg?: string };
}

interface Props {
  id: string;
  validator: Validator|unknown;
  immediate: boolean;
  inputForm: boolean;
  value: string|boolean|null;
}

const testRequired = (value: string): boolean => !value

const testMin = (min: number, value: string): boolean => value.length < min

const testMax = (max: number, value: string): boolean => value.length > max

const testRegex = (regExp: RegExp, value: string): boolean => !!(value?.match(regExp))

export default defineComponent({
  name: 'InputError',
  props: {
    id: { type: String, required: true },
    validator: { type: Object, required: true },
    immediate: { type: Boolean, default: false },
    inputForm: { type: Boolean, default: false },
    value: { type: [String, Boolean], default: null },
  },
  setup(props: Props) {

    const error = ref<string|undefined>('')

    const assertValue = computed<string>(() => props.value ? `${props.value}` : '')

    function errorCases() {

      const { msg, required, min, max, regex, custom } = props.validator as Validator

      switch(true) {

        /* required */

        case typeof required === 'boolean' && testRequired(assertValue.value):

          error.value = msg
          break

        case (typeof required === 'object' && typeof required.test === 'boolean') && testRequired(assertValue.value):

          error.value = (required as { msg: string }).msg ? (required as { msg: string }).msg : msg
          break

        /* min */

        case typeof min === 'number' && testMin(min, assertValue.value):

          error.value = msg
          break

        case (typeof min === 'object' && typeof min.test === 'number') && testMin(min.test, assertValue.value):

          error.value = (min as { msg: string }).msg ? (min as { msg: string }).msg : msg
          break

        /* max */

        case typeof max === 'number' && testMax(max, assertValue.value):

          error.value = msg
          break

        case (typeof max === 'object' && typeof max.test === 'number') && testMax(max.test, assertValue.value):

          error.value = (max as { msg: string }).msg ? (max as { msg: string }).msg : msg
          break

        /* regex */

        case regex instanceof RegExp && testRegex(regex, assertValue.value):

          error.value = msg
          break

        case (typeof regex === 'object' && regex.test instanceof RegExp) && testRegex(regex.test, assertValue.value):

          error.value = (regex as { msg: string }).msg ? (regex as { msg: string }).msg : msg
          break

        /* custom */

        case typeof custom === 'function' && custom(assertValue.value):

          error.value = msg
          break

        case (typeof custom === 'object' && typeof custom.test === 'function') && custom.test(assertValue.value):

          error.value = (custom as { msg: string }).msg ? (custom as { msg: string }).msg : msg
          break

        default:
          error.value = ''
      }
    }

    if (props.immediate) onMounted(() => errorCases())

    watch(
      () => props.value,
      () => errorCases(),
      { deep: true },
    )

    /* form */

    if (props.inputForm) {

      /* form errors */

      const updateFormErrors = inject('updateFormErrors') as Function

      watch(
        () => error.value,
        () => updateFormErrors({ [props.id]: !!error.value }),
        { immediate: true },
      )

      /* form submit */

      const submitting = inject('submitting') as Ref<boolean>

      watch(
        () => submitting.value,
        () => submitting.value && errorCases(),
        { immediate: true },
      )
    }

    return {
      error,
    }
  },
})
</script>

<style>
.input-error {
  color: red;
  min-height: 24px;
}

.input-error__msg {
  visibility: hidden;
}

.input-error--visible .input-error__msg {
  visibility: visible;
}
</style>
