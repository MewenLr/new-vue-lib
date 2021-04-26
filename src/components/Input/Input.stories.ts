import Input from './Input.vue'
import dataset from './Input.dataset'

const { props } = dataset

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Input },
  setup() {
    return { args }
  },
  template: '<Input v-bind="args" />',
})

export const Default: any = Template.bind({})
Default.args = {
  ...props,
  action: null,
}

export const Action: any = Template.bind({})
Action.args = {
  ...props,
  type: 'number',
}

export const ActionReversed: any = Template.bind({})
ActionReversed.args = {
  ...props,
  type: 'password',
  modelValue: 'abcd1234'
}
