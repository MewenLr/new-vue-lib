<template>
  <component
    data-item
    class="new-item"
    :is="itemTag"
    :href="itemHref(item)"
    :class="[
      noAccess && 'new-item--no-access',
      itemSelected && 'new-item--selected',
      itemTargeted && 'new-item--targeted',
    ]"
    @click="handleClick($event, item)"
    @mouseenter="$emit('mouseenter', $event, index)"
  >
    {{ item[label] ?? item }}
  </component>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { computed, defineComponent } from 'vue'
import { AnchorItem, RouterLinkItem, ActionItem, AnyItem } from './item.i'

export interface Props {
  index: number;
  label: string;
  noAccess: boolean;
  itemSelected: boolean;
  item: unknown|string|AnyItem;
}

export default defineComponent({
  name: 'NewItem',
  props: {
    index: { type: Number, required: true },
    label: { type: String, default: 'label' },
    noAccess: { type: Boolean, default: false },
    itemSelected: { type: Boolean, default: false },
    itemTargeted: { type: Boolean, default: false },
    item: { type: [String, Object], required: true },
  },
  emits: [
    'click',
    'mouseenter',
  ],
  setup(props: Props, { emit }) {
    const router = useRouter()

    const itemType = computed<string>(() => {

      switch (true) {
        /* div */
        case (props.noAccess && typeof props.item === 'string'):
          return 'div'

        case (props.noAccess && typeof (props.item as AnyItem)[props.label] === 'string'):
          return 'div'

        /* anchor */
        case (
          typeof (props.item as AnchorItem)?.to === 'string'
          && typeof (props.item as AnchorItem)[props.label] === 'string'
        ):
          return 'a'

        /* router-link */
        case (
          typeof (props.item as RouterLinkItem)?.to === 'string'
          && typeof (props.item as RouterLinkItem)[props.label] === 'string'
        ):
          return 'router-link'

        /* button */
        case (typeof props.item === 'string'):
          return 'button'

        case (typeof (props.item as ActionItem)[props.label] === 'string'):
          return 'button'

        default:
          console.error(`Item requires props item of type
            - string
            - { to: string; [key: string]: any }
            - { to: { name: string; [key: string]: any }; [key: string]: any }
            - { [key: string]: any }
          `)
          return ''
      }
    })

    const itemTag = computed<string|null>(() => (itemType.value === 'router-link' ? 'a' : itemType.value))

    function itemHref(item: AnchorItem|RouterLinkItem): string|null {
      if (itemType.value === 'a') return (item as AnchorItem).to
      if (itemType.value === 'router-link') return router.resolve({ name: (item as RouterLinkItem).to.name })?.path
      return null
    }

    function handleClick(event: Event, item: AnyItem) {
      if (itemType.value === 'router-link') return router.push(item.to)
      if (itemType.value === 'a') return window.open((item as AnchorItem).to, '_blank')
      if (itemType.value === 'div') return emit('click', event, item, props.index)
      if (itemType.value === 'button') return emit('click', event, item, props.index)
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
.new-item
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
