import { Ref } from 'vue'
import { ActionItem } from '@/components/Item/item.i'

export default (
  props: {
    clearLabel: string|null;
    items: unknown[]|string[]|ActionItem[];
  },
  indexSelected: Ref<number|null>,
  indexTargeted: Ref<number|null>,
  selectItem: Function,
) => {

  function navigateItem(direction: string, event: Event): number|false {
    console.log(direction)
    if (indexTargeted.value === null && indexSelected.value !== null) indexTargeted.value = indexSelected.value
    if (direction === 'down') {
      if (indexTargeted.value === null) return indexTargeted.value = 0
      const lastIndex = props.clearLabel ? props.items.length : (props.items.length - 1)
      if (indexTargeted.value === lastIndex) return false
      event.preventDefault()
      return indexTargeted.value += 1
    }
    if (direction === 'up') {
      if (indexTargeted.value === 0) return false
      if (indexTargeted.value !== null) return indexTargeted.value -= 1
      event.preventDefault()
    }
    return false
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') navigateItem('up', event)
    if (event.key === 'ArrowDown') navigateItem('down', event)
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') event.preventDefault()
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter' && indexTargeted.value !== null) {
      const selectedItem = props.clearLabel ? props.items[indexTargeted.value - 1] : props.items[indexTargeted.value]
      selectItem(event, selectedItem, indexTargeted.value)
    }
    if (event.key === 'Escape' && event.target) (event.target as HTMLInputElement).blur()
    if (event.key !== 'Tab') event.preventDefault()
  }

  return {
    navigateItem,
    handleKeyUp,
    handleKeyDown,
  }
}
