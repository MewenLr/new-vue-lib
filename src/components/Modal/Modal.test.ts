import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Modal from './Modal.vue'
import dataset from './Modal.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Modal]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Modal, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should not render data-header', async () => {
      expect(wrapper.find('[data-header]').exists()).toBeFalsy()
    })

    it('should render data-header', async () => {
      (slots as any).header = 'Dummy header slot'
      wrapper = prepareShallow(Modal, { propsData, slots })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-header]').exists()).toBeTruthy()
    })

    it('should not render data-footer', async () => {
      expect(wrapper.find('[data-footer]').exists()).toBeFalsy()
    })

    it('should render data-footer', async () => {
      (slots as any).footer = 'Dummy footer slot'
      wrapper = prepareShallow(Modal, { propsData, slots })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-footer]').exists()).toBeTruthy()
    })
  })
})
