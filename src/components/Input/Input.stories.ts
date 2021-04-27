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

export const Text: any = Template.bind({})
Text.args = {
  ...props,
  action: null,
}

export const Number: any = Template.bind({})
Number.args = {
  ...props,
  icon: null,
  type: 'number',
}

export const Password: any = Template.bind({})
Password.args = {
  ...props,
  type: 'password',
  modelValue: 'abcd1234'
}
