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

  <Cta tag="button">
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

  <!-- Checkbox -->

  <hr>

  <h2>Checkbox</h2>

  Toggle checkbox: {{ toggleCheckbox }}

  <br><br>

  <Checkbox
    id="toggleCheckbox"
    label="Toggle Checkbox"
    value="toggleCheckbox"
    v-model="toggleCheckbox"
  />

  <br><br>

  Dual checkbox: {{ dualCheckbox }}

  <br><br>

  <Checkbox
    label="Fizz"
    value="Fizz"
    id="checkbox-fizz"
    label-position="right"
    v-model="dualCheckbox"
  />
  <br>
  <Checkbox
    label="Buzz"
    value="Buzz"
    id="checkbox-buzz"
    label-position="right"
    v-model="dualCheckbox"
  />

  <br>

  <!-- Radio -->

  <hr>

  <h2>Radio</h2>

  Dual radio: {{ dualRadio }}

  <br><br>

  <Radio
    label="Fizz"
    value="Fizz"
    id="radio-fizz"
    v-model="dualRadio"
  />

  <br>

  <Radio
    label="Buzz"
    value="Buzz"
    id="radio-buzz"
    label-position="right"
    v-model="dualRadio"
  />

  <br>

  <!-- Toggle -->

  <hr>

  <h2>Toggle</h2>

  Toggle: {{ toggle }}

  <br><br>

  <Toggle
    id="toggle"
    label="Toggle"
    value="toggle"
    v-model="toggle"
  />

  <br>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Cta from '@/components/Cta/Cta.vue'
import Alert from '@/components/Alert/Alert.vue'
import Radio from '@/components/Radio/Radio.vue'
import Toggle from '@/components/Toggle/Toggle.vue'
import ListAlert from '@/components/Alert/ListAlert.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Cta,
    Alert,
    Radio,
    Toggle,
    Checkbox,
    ListAlert,
  },
  setup() {

    /* alerts */

    const alerts = ref<{ title: string, description: string }[]>([])

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

    /* checkbox */

    const toggleCheckbox = ref<boolean>(false)
    const dualCheckbox = ref<string[]>(['Fizz', 'Buzz'])

    /* checkbox */

    const dualRadio = ref<string>('Fizz')

    /* toggle */

    const toggle = ref<boolean>(false)

    return {
      /* alert */
      alerts,
      addAlert,
      showAlert,
      removeAlert,
      isAlertVisible,
      /* checkbox */
      dualCheckbox,
      toggleCheckbox,
      /* radio */
      dualRadio,
      /* toggle */
      toggle,
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
