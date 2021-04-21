<template>
  <div class="global-alerts">
    <Alert
      :delay="delay"
      :alert="alert"
      :key="alert.id"
      v-for="alert in alerts"
      @close="markAsRead(notif)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Alert from '@/components/Alert/Alert.vue'

export default defineComponent({
  name: 'GlobalAlerts',
  components: {
    Alert,
  },
  props: {
    delay: { type: Number, default: 0 },
    alerts: { type: Array, required: true },
  },
  setup() {

    return {
    }
  },
})
</script>

<style lang="sass">
.global-alerts
</style>
