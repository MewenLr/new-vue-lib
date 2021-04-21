import { VueWrapper } from '@vue/test-utils'
import { prepare } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Modal from './Modal.vue'
import dataset from './Modal.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Modal]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepare(Modal, { propsData, slots })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should not render header slot', async () => {
      expect(wrapper.find('[data-header]').exists()).toBeFalsy()
    })

    it('should render header slot', async () => {
      (slots as any).header = 'Dummy header slot'
      wrapper = prepare(Modal, { propsData, slots })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-header]').exists()).toBeTruthy()
    })

    it('should not render footer slot', async () => {
      expect(wrapper.find('[data-footer]').exists()).toBeFalsy()
    })

    it('should render footer slot', async () => {
      (slots as any).footer = 'Dummy footer slot'
      wrapper = prepare(Modal, { propsData, slots })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-footer]').exists()).toBeTruthy()
    })

    it('should return console error if no default slot', async () => {
      console.error = jest.fn()
      wrapper = prepare(Modal, { propsData })
      expect(console.error).toHaveBeenCalled()
    })
  })
})
