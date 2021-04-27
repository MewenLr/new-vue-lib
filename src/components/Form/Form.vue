<template>
  <form
    data-form
    class="form"
    @submit.prevent="handleSubmit($event)"
  >
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent, nextTick, provide, Ref, ref } from 'vue'

interface FormErrors {
  [key: string]: boolean;
}

export default defineComponent({
  name: 'Form',
  emits: [
    'error',
    'submit',
  ],
  setup(_, { emit }) {

    /* form errors */

    const formErrors = ref<FormErrors>({})

    provide<Function>('updateFormErrors', (inputError: object): FormErrors => {
      return formErrors.value = { ...formErrors.value, ...inputError }
    })

    /* form submit */

    const submitting = ref<boolean>(false)

    provide<Ref<boolean>>('submitting', submitting)

    function handleSubmit(event: Event): void {

      /* trigger update errors */

      submitting.value = true

      /* await update errors */

      nextTick(() => {

        if (Object.values(formErrors.value).includes(true)) emit('error', event, formErrors.value)
        else emit('submit', event)
        submitting.value = false
      })
    }

    return {
      handleSubmit,
    }
  },
})
</script>
