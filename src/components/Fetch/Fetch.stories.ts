import Fetch from './Fetch.vue'
import dataset from './Fetch.dataset'

const { props } = dataset

export default {
  title: 'Components/Fetch',
  component: Fetch,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Fetch },
  setup() {
    return { args }
  },
  template: '<Fetch v-bind="args" />',
})

export const Default: any = Template.bind({})
Default.args = props
