import Toggle from './Toggle.vue'
import dataset from './Toggle.dataset'

const { props } = dataset

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Toggle },
  setup() {
    return { args }
  },
  template: '<Toggle v-bind="args" />',
})

export const Default: any = Template.bind({})
Default.args = props
