<template>
  <img
    class="logo"
    src="@/assets/images/logo.png"
  >
  <h1>Vue Lib</h1>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from '@/pages/Home/Home.vue'

export default defineComponent({
  name: 'App',
  components: {
    Home,
  },
})
</script>

<style>
#app {
  padding: 0 10%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
}
</style>
