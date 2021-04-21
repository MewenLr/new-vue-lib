<template>
  <div
    data-input-drop
    ref="inputDrop"
    class="input-drop"
    :class="[
      isListVisible && 'input-drop--open',
      searchable && 'input-drop--searchable',
    ]"
  >
    <Input
      :id="id"
      :type="'text'"
      :cta-tag="'div'"
      :required="required"
      :autocomplete="false"
      :icon-action="'arrow'"
      :readonly="!searchable"
      :form-input="formInput"
      :error-flow="errorFlow"
      :validators="validators"
      :placeholder="placeholder"
      :reversed-action="reversedAction"
      v-model="bindedValue"
      @blur="handleBlur"
      @mousedown="manualToggleList"
      @focus="nativeToggleList(true)"
      @keyup="handleKeyUp($event)"
      @keydown="handleKeyDown($event)"
    />
    <ListItems
      no-access
      :items="listItems"
      :clear-label="clearLabel"
      :item-selected="modelValue"
      :index-targeted="indexTargeted"
      v-if="items.length"
      v-show="isListVisible"
      @selected="selectedItem"
      @targeted="targetedItem"
      @click.prevent="selectItem"
      @mousedown.prevent="selectItem"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ActionItem } from '@/components/Item/item.i'
import Input from '@/components/Input/Input.vue'
import ListItems from '@/components/ListItems/ListItems.vue'
import extInputNavigation from './extInputNavigation'

interface Props {
  closable: boolean;
  clearLabel: string|null;
  modelValue: unknown|string|ActionItem;
  items: unknown[]|string[]|ActionItem[];
}

type Items = unknown|string|ActionItem

export default defineComponent({
  name: 'InputDrop',
  components: {
    Input,
    ListItems,
  },
  props: {
    id: { type: String, required: true },
    items: { type: Array, required: true },
    placeholder: { type: String, default: '' },
    closable: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    clearLabel: { type: String, default: null },
    validators: { type: Object, default: null },
    formInput: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    errorFlow: { type: String, default: 'blurred' },
    reversedAction: { type: Boolean, default: false },
    modelValue: { type: [String, Object], default: null },
  },
  emits: [
    'blur',
    'click',
    'focus',
    'keyup',
    'keydown',
    'click-item',
    'update:modelValue',
  ],
  setup(props: Props, { emit }) {

    const listItems = ref<Items[]>(props.items)

    const bindedValue = computed<string>({
      get: () => (props.modelValue as ActionItem)?.label ?? props.modelValue,
      set: (value) => {
        const re = new RegExp(`^(${value})`, 'gi')
        listItems.value = props.items.filter((el: unknown|string|ActionItem) => {
          if (typeof el === 'string') return el.match(re)
          if (typeof (el as ActionItem).label === 'string') return (el as ActionItem).label.match(re)
          return false
        })
      },
    })

    const indexTargeted = ref<number|null>(null)
    const indexSelected = ref<number|null>(null)

    const inputDrop = ref<HTMLElement|null>(null)
    const input = computed<HTMLElement|null>(
      () => inputDrop.value && inputDrop.value.querySelector('.input__field'),
    )

    /* toggle */

    const isListVisible = ref<boolean>(false)

    function nativeToggleList(show: boolean) {
      isListVisible.value = show
      if (!show) indexTargeted.value = null
      return emit(show ? 'focus' : 'blur')
    }

    function manualToggleList(event: Event) {
      event.preventDefault()
      if (isListVisible.value) return input.value?.blur()
      return input.value?.focus()
    }

    function handleBlur() {
      listItems.value = props.items
      nativeToggleList(false)
    }

    /* selection */

    const selectedItem = (index: number) => indexSelected.value = index
    const targetedItem = (index: number) => indexTargeted.value = index

    function selectItem(event: Event, value: ActionItem, index: number) {
      if (props.clearLabel && index === 0) emit('update:modelValue', null)
      else emit('update:modelValue', value)

      if (props.closable) manualToggleList(event)
    }

    /* navigation */

    const { navigateItem, handleKeyUp, handleKeyDown } = extInputNavigation(props, indexSelected, indexTargeted, selectItem)

    return {
      bindedValue,
      listItems,

      indexTargeted,
      indexSelected,

      inputDrop,
      isListVisible,
      nativeToggleList,
      manualToggleList,
      handleBlur,

      selectItem,
      selectedItem,
      targetedItem,

      navigateItem,
      handleKeyUp,
      handleKeyDown,
    }
  },
})
</script>

<style lang="sass">
$input-drop-height: 24px
$input-drop-margin-y: 6px
$input-drop-margin-x: 12px
$input-drop-cta-size: $input-drop-height + ($input-drop-margin-y * 2) + 2px

.input-drop
  position: relative

  .input
    position: relative

    &__cta
      left: 100%
      border: none
      position: absolute
      z-index: $z-index-xl
      transform: translateX(-100%)
      background-color: transparent

    &__field
      cursor: pointer
      border-radius: $radius-m
      padding-right: $input-drop-cta-size

      &:hover
        background-color: transparent

    &__cta-icon
      width: $icon-s
      fill: $tertiary

    &--reversed-action

      .input

        &__cta
          transform: translateX(0)

        &__field
          padding-left: $input-drop-cta-size

  .list-item
    width: 100%
    margin-top: 1px
    position: absolute
    z-index: $z-index-xxl

  .item
    cursor: pointer

    &--targeted,
    &--selected
      background-color: $background

  &--open

    .input

      &__cta-icon
        transform: rotate(180deg)

  &--searchable

    .input

      &__field
        cursor: text
</style>
