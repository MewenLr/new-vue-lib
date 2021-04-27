import Veil from './Veil.vue'
import dataset from './Veil.dataset'

const { props } = dataset

export default {
  title: 'Components/Veil',
  component: Veil,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Veil },
  setup() {
    return { args }
  },
  template: '<Veil v-bind="args" />',
})

export const Default: any = Template.bind({})
Default.args = props
