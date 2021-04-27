import { ref } from 'vue'
import Checkbox from './Checkbox.vue'
import dataset from './Checkbox.dataset'

const { props } = dataset

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
  },
}

/* toggle checkbox */

const TemplateToggle = (args: any) => ({
  components: { Checkbox },
  setup() {
    return { args }
  },
  template: '<Checkbox v-bind="args" />',
})

export const ToggleCheckbox: any = TemplateToggle.bind({})
ToggleCheckbox.args = props

/* dual checkbox */

const TemplateDual = () => ({
  components: { Checkbox },
  setup() {
    const dualCheckbox = ref<string[]>(['Fizz', 'Buzz'])

    const fizz = ref<Record<string, unknown>>({
      id: 'fizz',
      label: 'Fizz',
      value: 'Fizz',
    })

    const buzz = ref<Record<string, unknown>>({
      id: 'buzz',
      label: 'Buzz',
      value: 'Buzz',
    })

    return {
      buzz,
      fizz,
      dualCheckbox,
    }
  },
  template: `
    <Checkbox
      v-bind="fizz"
      v-model="dualCheckbox"
    />
    <br>
    <Checkbox
      v-bind="buzz"
      v-model="dualCheckbox"
    />
  `,
})

export const DualCheckbox: any = TemplateDual.bind({})
