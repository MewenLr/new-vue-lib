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
import { FormErrors } from '@/scripts/contracts/interfaces'
import { defineComponent, onBeforeMount, provide, ref } from 'vue'

export default defineComponent({
  name: 'Form',
  emits: [
    'error',
    'submit',
  ],
  setup(_, { slots, emit }) {

    onBeforeMount((): false|void => !slots.default && console.error('Form requires any Input as default slot.'))

    const formErrors = ref<object>({})

    function updateFormErrors(inputError: object): FormErrors {
      return formErrors.value = { ...formErrors.value, ...inputError }
    }

    provide('updateFormErrors', updateFormErrors)

    const formSubmitFail = ref<boolean>(false)

    provide('formSubmitFail', formSubmitFail)

    function handleSubmit($event: Event): void {

      if (Object.values(formErrors.value).includes(true)) {
        formSubmitFail.value = true
        return emit('error', $event, formErrors.value)
      }
      formSubmitFail.value = false
      return emit('submit', $event)
    }

    return {
      handleSubmit,
    }
  },
})
</script>

<style lang="sass">
.form
</style>
