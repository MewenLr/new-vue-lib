import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import FormGroup from './FormGroup.vue'
import dataset from './FormGroup.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[FormGroup]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(FormGroup, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render data-label', async () => {
      expect(wrapper.find('[data-label]').exists()).toBeTrue()
    })

    it('should render data-error', async () => {
      expect(wrapper.find('[data-error]').exists()).toBeTrue()
    })

    it('should not render data-error', async () => {
      propsData.validator = null
      wrapper = prepareShallow(FormGroup, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').exists()).toBeFalse()
    })
  })
})
