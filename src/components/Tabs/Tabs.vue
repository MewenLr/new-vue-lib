<template>
  <div class="tabs">
    <ul class="tabs__titles">
      <li
        data-title
        class="tabs__title"
        :key="title"
        :class="title === selectedTitle && 'tabs__title--selected'"
        v-for="title in titles"
      >
        <button
          class="tabs__cta"
          @click="selectTitle(title)"
        >
          {{ title }}
        </button>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, Ref, ref, VNode } from 'vue'

export default defineComponent({
  name: 'Tabs',
  setup(_, { slots }) {

    const titles = computed<string[]>(() => {
      if (slots.default) return slots.default().map((tab: VNode) => tab?.props?.title)
      return []
    })

    const selectedTitle = ref<string>(titles.value[0])

    function selectTitle(title: string): string {
      return selectedTitle.value = title
    }

    provide<Ref<string>>('selectedTitle', selectedTitle)

    return {
      titles,
      selectTitle,
      selectedTitle,
    }
  },
})
</script>

<style lang="css">
.tabs__titles {
  padding: 0;
  display: flex;
  list-style: none;
  justify-content: space-between;
}

.tabs__title {
  background-color: lightgrey;
}

.tabs__title--selected {
  background-color: lightseagreen;
}

.tabs__cta {
  border: none;
  cursor: pointer;
  background: none;
}
</style>
