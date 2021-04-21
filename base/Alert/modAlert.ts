import { computed, ref } from 'vue'
import Alert from './alert.i'

interface Alert {
  id: number;
  position: string;
}

const stackAlertLocal = ref<Alert[]>([])

export default () => {

  const mutateStack = (type: string, index: number) => (type === 'global' ? stackAlertGlobal : stackAlertLocal).value.splice(index, 1)
  const mutatePushStack = (type: string, newAlert: Alert) => (type === 'global' ? stackAlertGlobal : stackAlertLocal).value.push(newAlert)

  function removeFromStack(type: string, id: number) {
    mutateStack(type, id)
  }

  function addToStack(type: string, id: number, position: string) {
    mutatePushStack(type, { id, position })
  }

  return {
    addToStack,
    removeFromStack,
    stackAlertLocal: computed<Alert[]>(() => stackAlertLocal.value),
    stackAlertGlobal: computed<Alert[]>(() => stackAlertGlobal.value),
  }
}
