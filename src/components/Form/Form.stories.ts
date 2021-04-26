import { ref } from 'vue'
import Form from './Form.vue'
import dataset from './Form.dataset'
import Input from '../Input/Input.vue'
import FormGroup from '../FormGroup/FormGroup.vue'

const { props } = dataset

export default {
  title: 'Components/Form',
  component: Form,
  argTypes: {
    onError: { action: 'error' },
    onSubmit: { action: 'submit' },
  },
}

const Template = (args: any) => ({
  components: {
    Form,
    Input,
    FormGroup,
  },
  setup() {
    const inputValue = ref<string|null>(null)

    const validator = ref<Record<string, unknown>>({
      msg: 'Default error message',
      required: true,
      min: 3,
      max: 8,
    })

    return {
      args,
      validator,
      inputValue,
    }
  },
  template: `
    <Form
      v-bind="args"
      id="dummyForm"
      @submit="test"
      @error="testError"
    >
      <FormGroup
        immediate
        label-position="right"
        label="Form Group Reversed"
        group-for="form-group-reversed"
        :value="inputValue"
        :validator="validator"
      >
        <Input
          icon="placeholder"
          id="form-group-reversed"
          :action="{ icon: 'placeholder' }"
          v-model="inputValue"
        />
      </FormGroup>

      <br>

      <FormGroup
        label="Form Group"
        group-for="form-group"
        :value="inputValue"
        :validator="validator"
      >
        <Input
          id="form-group"
          icon="placeholder"
          v-model="inputValue"
        />
      </FormGroup>
    </Form>

    <button
      type="submit"
      form="dummyForm"
    >
      Submit
    </button>
  `,
})

export const Default: any = Template.bind({})
Default.args = props
