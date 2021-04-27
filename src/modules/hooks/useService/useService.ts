import { computed, ComputedRef, ref } from 'vue'

interface Hook {
  fetchApi: Function;
  error: ComputedRef<boolean>;
  success: ComputedRef<boolean>;
  loading: ComputedRef<boolean>;
}

export default (): Hook => {
  const error = ref<boolean>(false)
  const success = ref<boolean>(false)
  const loading = ref<boolean>(false)

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async function fetchApi(action: any): Promise<any> {

    loading.value = true

    if (!action) return Promise.reject('Service not found')

    try {
      const data = await action
      success.value = true
      loading.value = false
      return data
    } catch (err) {
      error.value = true
      loading.value = false
      return Promise.reject(err)
    }
  }

  return {
    fetchApi,
    error: computed<boolean>(() => error.value),
    success: computed<boolean>(() => success.value),
    loading: computed<boolean>(() => loading.value),
  }
}
