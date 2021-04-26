import Input from '../Input/Input.vue'
import FormGroup from './FormGroup.vue'
import dataset from './FormGroup.dataset'

const { props } = dataset

export default {
  title: 'Components/FormGroup',
  component: FormGroup,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Input, FormGroup },
  setup() {
    return { args }
  },
  template: `
    <FormGroup v-bind="args">
      <Input
        id="dummy"
        icon="placeholder"
      />
    </FormGroup>
  `,
})

export const Default: any = Template.bind({})
Default.args = props

export const LabelTop: any = Template.bind({})
LabelTop.args = {
  ...props,
  labelPosition: 'top',
}

export const LabelRight: any = Template.bind({})
LabelRight.args = {
  ...props,
  labelPosition: 'right',
}
