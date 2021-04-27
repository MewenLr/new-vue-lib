import Title from './Title.vue'
import dataset from './Title.dataset'

const { props } = dataset

export default {
  title: 'Components/Title',
  component: Title,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Title },
  setup() {
    return { args }
  },
  template: `
    <Title tag="h1">
      h1 Title
    </Title>

    <Title tag="h2">
      h2 Title
    </Title>

    <Title tag="h3">
      h3 Title
    </Title>
  `,
})

export const Default: any = Template.bind({})
