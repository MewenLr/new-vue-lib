import Checkbox from './Checkbox.vue'
import dataset from './Checkbox.dataset'

const { props } = dataset

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Checkbox },
  setup() {
    return { args }
  },
  template: '<Checkbox v-bind="args" />',
})

export const Boolean: any = Template.bind({})
Boolean.args = props

export const StringArray: any = Template.bind({})
StringArray.args = {
  ...props,
  label: 'Fizz',
  value: 'Fizz',
  labelPosition: 'right',
  modelValue: ['Fizz', 'Buzz'],
}
