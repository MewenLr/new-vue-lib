import Item from './Item/Item.vue'
import ListItems from './ListItems.vue'
import dataset from './ListItems.dataset'

const { props } = dataset

export default {
  title: 'Components/ListItems',
  component: ListItems,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: {
    Item,
    ListItems,
  },
  setup() {
    return { args }
  },
  template: `
    <ListItems>
      <Item
        tag="button"
        :item="{
          fizz: 'Fizz',
          buzz: 'Buzz',
        }"
      >
        Item Button
      </Item>
      <Item tag="div">
        Item Div
      </Item>
      <Item
        tag="anchor"
        to="https://www.google.com/"
      >
        Item Anchor
      </Item>
    </ListItems>
  `,
})

export const Default: any = Template.bind({})
Default.args = props
