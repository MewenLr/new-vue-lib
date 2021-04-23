<template>
  <!-- Alert -->

  <hr>

  <h2>Alert</h2>

  <button
    class="home__btn"
    @click="showAlert"
  >
    Show Alert
  </button>

  <br>

  <transition name="fade">
    <Alert
      :alert="{
        title: 'Dummy alert 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis interdum est, eu dictum orci pellentesque varius.',
      }"
      v-if="isAlertVisible"
    />
  </transition>

  <br>

  <!-- List Alert -->

  <hr>

  <h2>List Alert</h2>

  <div>
    <button
      class="home__btn"
      @click="addAlert"
    >
      Add Alert
    </button>
    &nbsp;
    <button
      class="home__btn"
      @click="removeAlert"
    >
      Remove Alert
    </button>
  </div>

  <br>

  Number alerts: {{ alerts.length }}

  <ListAlert>
    <transition-group name="slide-fade-right">
      <Alert
        :alert="alert"
        :key="alert.title"
        v-for="alert in alerts"
      />
    </transition-group>
  </ListAlert>

  <br>

  <!-- Cta -->

  <hr>

  <h2>Cta</h2>

  <Cta>
    Cta button
  </Cta>

  <br>

  <Cta tag="div">
    Cta div
  </Cta>

  <br>

  <Cta
    tag="link"
    :to="{ name: 'dummy' }"
  >
    Cta router-link
  </Cta>

  <br>

  <Cta
    tag="anchor"
    to="https://www.google.com/"
  >
    Cta anchor
  </Cta>

  <br>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Cta from '@/components/Cta/Cta.vue'
import Alert from '@/components/Alert/Alert.vue'
import ListAlert from '@/components/Alert/ListAlert.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Cta,
    Alert,
    ListAlert,
  },
  setup() {

    /* alerts */

    const alerts = ref<{ title: string, description: string }[]>([
      {
        title: 'Dummy alert 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis interdum est, eu dictum orci pellentesque varius.',
      },
    ])

    const isAlertVisible = ref<boolean>(false)

    function showAlert() {
      return isAlertVisible.value = !isAlertVisible.value
    }

    function addAlert() {
      return alerts.value.push({
        title: `Dummy ${alerts.value.length + 1}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis interdum est, eu dictum orci pellentesque varius.',
      })
    }

    function removeAlert() {
      return alerts.value.shift()
    }

    return {
      alerts,
      addAlert,
      showAlert,
      removeAlert,
      isAlertVisible,
    }
  },
})
</script>

<style>
@import url('../../styles/animations.css');

.home__btn {
  padding: 5px;
  background-color: lightgrey;
}
</style>
