import Item from './Item.vue'
import dataset from './Item.dataset'

const { props } = dataset

export default {
  title: 'Components/Item',
  component: Item,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Item },
  setup() {
    return { args }
  },
  template: `
    <Item v-bind="args">
      Item component
    </Item>
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

