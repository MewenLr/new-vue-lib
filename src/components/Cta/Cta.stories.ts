import Cta from './Cta.vue'
import dataset from './Cta.dataset'

const { props } = dataset

export default {
  title: 'Components/Cta',
  component: Cta,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Cta },
  setup() {
    return { args }
  },
  template: `
    <Cta v-bind="args">
      Cta component
    </Cta>
  `,
})

/* Button */

export const Button: any = Template.bind({})
Button.args = props

/* Div */

export const Div: any = Template.bind({})
Div.args = { ...props, tag: 'div' }

/* Anchor */

export const Anchor: any = Template.bind({})
Anchor.args = { ...props, tag: 'anchor', to: 'https://www.google.com/' }

// /* Link */

// export const Link: any = Template.bind({})
// Link.args = { ...props, tag: 'link', to: { name: '/dummy' } }
