import Test from './Test.vue'

export default {
  title: 'Components/Test',
  component: Test,
  argTypes: {
  },
}

const Template = (args: Record<string, unknown>) => ({
  components: { Test },
  setup() {
    return { args }
  },
  template: '<Test v-bind="args" />',
})

export const Default = Template.bind({})
