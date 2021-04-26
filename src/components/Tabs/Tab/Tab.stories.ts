import Tab from './Tab.vue'
import dataset from './Tab.dataset'

const { props } = dataset

export default {
  title: 'Components/Tab',
  component: Tab,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Tab },
  provide: {
    selectedTitle: props.title,
  },
  setup() {
    return { args }
  },
  template: `
    <Tab v-bind="args">
      Tab 1
    </Tab>
  `,
})

export const Default: any = Template.bind({})
Default.args = props
