import Tabs from './Tabs.vue'
import Tab from './Tab/Tab.vue'
import dataset from './Tabs.dataset'

const { props } = dataset

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Tab, Tabs },
  setup() {
    return { args }
  },
  template: `
    <Tabs v-bind="args">
      <Tab title="Tab 1">
        Hello from Tab 1
      </Tab>
      <Tab title="Tab 2">
        Hello from Tab 2
      </Tab>
      <Tab title="Tab 3">
        Hello from Tab 3
      </Tab>
    </Tabs>
  `,
})

export const Default: any = Template.bind({})
Default.args = props
