<template>
  <div class="tabs">
    <ul class="tabs__header">
      <li
        class="tabs__item"
        :key="title"
        :class="{ 'tabs__item--selected': title === selectedTitle }"
        v-for="title in titles"
        @click="selectTitle(title)"
      >
        <button
          class="tabs__cta"
        >
          {{ title }}
        </button>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, provide, ref, VNode } from 'vue'

export default defineComponent({
  name: 'Tabs',
  props: {
  },
  setup(_, { slots }) {

    onBeforeMount((): false|void => !slots.default && console.error('Tabs requires a default slot.'))

    const titles = computed<string[]>(() => {
      if (slots.default) return slots.default().map((tab: VNode) => tab?.props?.title)
      return []
    })

    const selectedTitle = ref<string>(titles.value[0])

    function selectTitle(title: string) {
      return selectedTitle.value = title
    }

    provide('selectedTitle', selectedTitle)

    return {
      titles,
      selectTitle,
      selectedTitle,
    }
  },
})
</script>

<style lang="sass">
.tabs
  margin: 0 auto
  max-width: 400px

  &__header
    padding: 0
    display: flex
    list-style: none
    margin-bottom: 10px
    justify-content: space-between

  &__item
    border-radius: 5px
    background-color: lightgrey

    &--selected
      background-color: lightblue

  &__cta
    width: 80px
    height: 100%
    border: none
    cursor: pointer
    background: none
    text-align: center
    padding: 10px 20px
    border-radius: inherit
    transition: all .4s linear

    &:focus
      @extend .outline
</style>
