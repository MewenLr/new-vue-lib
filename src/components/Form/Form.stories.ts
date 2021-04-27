import { ref } from 'vue'
import Form from './Form.vue'
import dataset from './Form.dataset'
import Input from '../Input/Input.vue'
import Checkbox from '../Checkbox/Checkbox.vue'
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
    Checkbox,
    FormGroup,
  },
  setup() {
    const inputValue = ref<string|null>(null)
    const toggleCheckbox = ref<boolean>(false)

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
      toggleCheckbox,
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
        label="Form Group 1"
        group-for="form-group-1"
        :value="inputValue"
        :validator="validator"
      >
        <Input
          icon="placeholder"
          id="form-group-1"
          v-model="inputValue"
        />
      </FormGroup>

      <br>

      <FormGroup
        label="Form Group 2"
        group-for="form-group-2"
        :value="inputValue"
        :validator="validator"
      >
        <Input
          id="form-group-2"
          icon="placeholder"
          v-model="inputValue"
        />
      </FormGroup>

      <br>

      <FormGroup
        label="Form Group Toggle"
        group-for="form-group-toggle"
        :value="toggleCheckbox"
        :validator="{
          required: true,
          msg: 'Checkbox is required',
        }"
      >
        <Checkbox
          id="form-group-toggle"
          label="Toggle Checkbox"
          value="toggleCheckbox"
          v-model="toggleCheckbox"
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
