import Radio from './Radio.vue'
import dataset from './Radio.dataset'

const { props } = dataset

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Radio },
  setup() {
    return { args }
  },
  template: '<Radio v-bind="args" />',
})

export const Default: any = Template.bind({})
Default.args = {
  ...props,
}