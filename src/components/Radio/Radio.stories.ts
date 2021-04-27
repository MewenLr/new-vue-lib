import { ref } from 'vue'
import Radio from './Radio.vue'
import dataset from './Radio.dataset'

const { props } = dataset

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
  },
}

const Template = () => ({
  components: { Radio },
  setup() {

    const dualRadio = ref<string>('Fizz')

    const fizz = ref<Record<string, unknown>>({
      id: 'fizz',
      label: 'Fizz',
      value: 'Fizz',
    })

    const buzz = ref<Record<string, unknown>>({
      id: 'buzz',
      label: 'Buzz',
      value: 'Buzz',
    })

    return {
      buzz,
      fizz,
      dualRadio,
    }
  },
  template: `
    <Radio
      v-bind="fizz"
      v-model="dualRadio"
    />
    <br>
    <Radio
      v-bind="buzz"
      v-model="dualRadio"
    />
  `,
})

export const Default: any = Template.bind({})
