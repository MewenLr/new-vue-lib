<template>
  <component
    data-item
    class="item"
    :is="itemTag"
    :href="itemHref(item)"
    :class="[
      noAccess && 'item--no-access',
      itemSelected && 'item--selected',
      itemTargeted && 'item--targeted',
    ]"
    @click="handleClick($event, item)"
    @mousedown="handleClick($event, item)"
    @mouseenter="$emit('mouseenter', $event, index)"
  >
    {{ item.label ?? item }}
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter, _RouteLocationBase } from 'vue-router'
import { AnchorItem, RouterLinkItem, ActionItem, AnyItem } from './item.i'

export interface Props {
  index: number;
  noAccess: boolean;
  itemSelected: boolean;
  item: unknown|string|AnyItem;
}

export default defineComponent({
  name: 'Item',
  props: {
    index: { type: Number, required: true },
    noAccess: { type: Boolean, default: false },
    itemSelected: { type: Boolean, default: false },
    itemTargeted: { type: Boolean, default: false },
    item: { type: [String, Object], required: true },
  },
  emits: [
    'click',
    'mousedown',
    'mouseenter',
  ],
  setup(props: Props, { emit }) {
    const router = useRouter()

    const itemType = computed<string>(() => {

      const isItem = typeof props.item === 'string' || typeof (props.item as AnyItem)?.label === 'string'

      if (props.noAccess && isItem) return 'div'

      if (typeof props.item === 'string') return 'button'

      if (
        typeof (props.item as AnchorItem)?.to === 'string'
        && typeof (props.item as AnchorItem)?.label === 'string'
      ) return 'a'

      if (
        typeof (props.item as RouterLinkItem)?.label === 'string'
        && typeof (props.item as RouterLinkItem)?.to?.name === 'string'
      ) return 'router-link'

      if (typeof (props.item as unknown as ActionItem)?.label === 'string') return 'button'

      console.error(`Item requires props item of type
        - string
        - { label: string; to: string }
        - { label: string; to: { name: string } }
        - { label: string; [key: string]: string }
      `)

      return ''
    })

    const itemTag = computed<string|null>(() => {
      if (itemType.value === 'router-link') return 'a'
      return itemType.value
    })

    function itemHref(item: AnchorItem|RouterLinkItem): string|_RouteLocationBase|null {
      if (itemType.value === 'a') return item?.to as string
      if (itemType.value === 'router-link') {
        const route = item?.to as _RouteLocationBase
        return router.resolve({ name: route.name } as _RouteLocationBase)?.path
      }
      return null
    }

    function handleClick(event: Event, item: AnyItem) {
      if (itemType.value === 'router-link') return router.push(item?.to)
      if (itemType.value === 'a') return window.open((item as AnchorItem)?.to, '_blank')
      if (itemType.value === 'div') return emit(event.type as 'click'|'mousedown', event, item, props.index)
      if (itemType.value === 'button') return emit(event.type as 'click'|'mousedown', event, item, props.index)
      return console.error('item type unknow')
    }

    return {
      itemTag,
      itemHref,
      handleClick,
    }
  },
})
</script>

<style lang="sass">
.item
  $self: &
  margin: 0
  height: 100%
  border: none
  outline: none
  display: block
  cursor: pointer
  font-size: 1rem
  color: $primary
  text-align: start
  padding: 6px 24px
  text-decoration: none
  box-sizing: content-box
  width: calc(100% - 24px * 2)
  background-color: transparent

  &:focus
    @extend .outline
    position: relative
    z-index: $z-index-l
    box-shadow: $shadow-outline inset

  &--targeted,
  &--selected
    background-color: $background

  &--no-access
    cursor: default

    &#{ $self }--targeted,
    &#{ $self }--selected
      background-color: initial
</style>
