<template>
  <ul
    data-list-items
    class="list-items"
    @mouseleave="untargetItems"
  >
    <li
      data-item
      class="list-items__item"
      :key="typeof item === 'string' ? item : item.label"
      v-for="(item, idx) in compItems"
    >
      <Item
        :item="item"
        :index="idx"
        :no-access="noAccess"
        :item-selected="isItemSelected(idx)"
        :item-targeted="isItemTargeted(idx)"
        @click="selectItem"
        @mousedown="selectItem"
        @mouseenter="targetItem"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { AnchorItem, RouterLinkItem, ActionItem, AnyItem } from '@/components/Item/item.i'
import findIndex from 'lodash/findIndex'
import Item from '@/components/Item/Item.vue'

type ListItems = string[]|AnchorItem[]|RouterLinkItem[]|ActionItem[]

interface Props {
  noAccess: boolean;
  clearLabel: string|null;
  items: unknown[]|ListItems;
  indexTargeted: number|null;
  itemSelected: unknown|string|AnyItem;
}

export default defineComponent({
  name: 'ListItem',
  components: {
    Item,
  },
  props: {
    items: { type: Array, required: true },
    noAccess: { type: Boolean, default: false },
    clearLabel: { type: String, default: null },
    indexTargeted: { type: Number, default: null },
    itemSelected: { type: [String, Object], default: null },
  },
  emits: [
    'click',
    'selected',
    'targeted',
    'mousedown',
  ],
  setup(props: Props, { emit }) {

    const compItems = computed<unknown[]|ListItems>(() => (props.clearLabel ? [props.clearLabel, ...props.items] : props.items))

    const idxTargeted = ref<number|null>(null)
    const idxSelected = ref<number|null>(null)

    const isItemSelected = (idx: number): boolean => idxSelected.value !== null && idxSelected.value === idx
    const isItemTargeted = (idx: number): boolean => idxTargeted.value !== null && idxTargeted.value === idx

    function selectItem(event: Event, item: AnyItem, index: number): void {
      idxSelected.value = index
      return emit(event.type as 'click'|'mousedown', event, item, index)
    }

    function targetItem(event: Event, index: number) {
      idxTargeted.value = index
      return emit('targeted', idxTargeted.value)
    }

    const untargetItems = () => idxTargeted.value = null

    watch(
      () => props.indexTargeted,
      () => idxTargeted.value = props.indexTargeted,
      { immediate: true },
    )

    watch(
      () => props.itemSelected,
      () => {
        if (typeof props.itemSelected === 'string') {
          idxSelected.value = (props.items as string[]).indexOf(props.itemSelected as string)
        }
        if (typeof (props.itemSelected as AnyItem)?.label === 'string') {
          idxSelected.value = findIndex(props.items, props.itemSelected as ActionItem)
        }
        if (props.clearLabel && idxSelected.value !== null && idxSelected.value >= 0) idxSelected.value += 1
        if (props.itemSelected === null) idxSelected.value = null
        emit('selected', idxSelected.value)
      },
      { immediate: true },
    )

    return {
      compItems,
      selectItem,
      targetItem,
      untargetItems,
      isItemTargeted,
      isItemSelected,
    }
  },
})
</script>

<style lang="sass">
.list-items
  margin: 0
  padding: 0
  overflow: auto
  list-style-type: none
  background-color: white
  border-top: 1px solid $tertiary

  &__item
    width: 100%
    border-bottom: 1px solid $tertiary
</style>
