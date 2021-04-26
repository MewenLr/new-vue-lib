import InputError from './InputError.vue'
import dataset from './InputError.dataset'

const { props } = dataset

export default {
  title: 'Components/InputError',
  component: InputError,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { InputError },
  setup() {
    return { args }
  },
  template: '<InputError v-bind="args" />',
})

export const Default: any = Template.bind({})
Default.args = props
