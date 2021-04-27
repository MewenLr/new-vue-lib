import Modal from './Modal.vue'
import dataset from './Modal.dataset'

const { props } = dataset

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
  },
}

const Template = (args: any) => ({
  components: { Modal },
  setup() {
    return { args }
  },
  template: `
    <Modal v-bind="args">
      <template #header>
        <h2>
          Title Modal
        </h2>
      </template>
      Modal component
      <template #footer>
        <button>
          Close
        </button>
      </template>
    </Modal>
  `,
})

export const Default: any = Template.bind({})
Default.args = props
