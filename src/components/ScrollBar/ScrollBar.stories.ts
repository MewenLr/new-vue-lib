import ScrollBar from './ScrollBar.vue'
import dataset from './ScrollBar.dataset'

const { props } = dataset

export default {
  title: 'Components/ScrollBar',
  component: ScrollBar,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { ScrollBar },
  setup() {
    return { args }
  },
  template: '<ScrollBar v-bind="args" />',
})

export const Default: any = Template.bind({})
Default.args = props
