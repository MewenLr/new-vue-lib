import ProgressBar from './ProgressBar.vue'

export default {
  title: 'Example/ProgressBar',
  component: ProgressBar,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    onClick: {},
  },
}

const Template = (args) => ({
  components: {
    ProgressBar,
  },
  setup() { return { args } },
  template: '<ProgressBar v-bind="args" />',
})

export const Default = Template.bind({})

Default.args = {
  primary: true,
  label: 'ProgressBar',
}
