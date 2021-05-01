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
  template: `
    <ScrollBar
      style="
        width: 400px;
        height: 400px;
        background-color: white;
      "
    >
      <span>
        Paragraph 1<br>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Enim earum consequuntur ipsum dicta libero quae ab omnis vitae commodi
        officia aliquam pariatur cum quam soluta, distinctio est totam sequi nihil.
        <br><br>
      </span>
      <span>
        Paragraph 2<br>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Enim earum consequuntur ipsum dicta libero quae ab omnis vitae commodi
        officia aliquam pariatur cum quam soluta, distinctio est totam sequi nihil.
        <br><br>
      </span>
      <span>
        Paragraph 3<br>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Enim earum consequuntur ipsum dicta libero quae ab omnis vitae commodi
        officia aliquam pariatur cum quam soluta, distinctio est totam sequi nihil.
        <br><br>
      </span>
      <span>
        Paragraph 4<br>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Enim earum consequuntur ipsum dicta libero quae ab omnis vitae commodi
        officia aliquam pariatur cum quam soluta, distinctio est totam sequi nihil.
        <br><br>
      </span>
    </ScrollBar>
  `,
})

export const Default: any = Template.bind({})
