module.exports = (name) => `import ${name} from './${name}.vue'
import dataset from './${name}.dataset'

const { props } = dataset

export default {
  title: 'Components/${name}',
  component: ${name},
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { ${name} },
  setup() {
    return { args }
  },
  template: '<${name} v-bind="args" />',
})

export const Default: any = Template.bind({})
Default.args = props
`
