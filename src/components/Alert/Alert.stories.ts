import Alert from './Alert.vue'
import dataset from './Alert.dataset'

const { props } = dataset

export default {
  title: 'Components/Alert',
  component: {
    Alert,
  },
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Alert },
  setup() {
    return { args }
  },
  template: '<Alert v-bind="args" />',
})

export const Default: any = Template.bind({})
Default.args = props
