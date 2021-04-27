import { ref } from 'vue'
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
  provide: {
    /* Form // InputError */
    submitting: false,
    updateFormErrors: () => null,
  },
  setup() {
    const inputValue = ref<string|null>(null)

    return {
      args,
      inputValue,
    }
  },
  template: `
    <FormGroup
      v-bind="args"
      :value="inputValue"
    >
      <Input
        id="dummy"
        icon="placeholder"
        v-model="inputValue"
      />
    </FormGroup>
  `,
})

export const LabelLeft: any = Template.bind({})
LabelLeft.args = props

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
