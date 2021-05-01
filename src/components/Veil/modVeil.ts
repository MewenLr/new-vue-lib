import { ref } from 'vue'

interface Module {
  actNbVeils: Function;
}

const stNbVeils = ref<number>(0)

export default (): Module => {

  const mutNbVeils = (value: number) => stNbVeils.value += value

  function actNbVeils(inc: number): void {
    mutNbVeils(inc)
    if (stNbVeils.value) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }

  return {
    actNbVeils,
  }
}
