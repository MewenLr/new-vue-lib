import { ref } from 'vue'

interface Module {
  updateNbVeils: Function;
}

const nbVeils = ref<number>(0)

export default (): Module => {

  function updateNbVeils(inc: number): void {
    nbVeils.value += inc
    if (nbVeils.value) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }

  return {
    updateNbVeils,
  }
}
