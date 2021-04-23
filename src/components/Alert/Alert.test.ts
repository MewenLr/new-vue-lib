import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Alert from './Alert.vue'
import dataset from './Alert.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Alert]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Alert, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render data-title', async () => {
      expect(wrapper.find('[data-title]').exists()).toBeTruthy()
    })

    it('should render data-close', async () => {
      expect(wrapper.find('[data-close]').exists()).toBeTruthy()
    })

    it('should render data-description', async () => {
      expect(wrapper.find('[data-description]').exists()).toBeTruthy()
    })
  })

  describe('Actions', () => {

    it('should emit close on click data-close', async () => {
      wrapper.find('[data-close]').trigger('click')
      expect(!!wrapper.emitted('close')).toBeTrue()
    })

    it('should emit close after delay', async () => {
      jest.useFakeTimers()
      const delay = 3000
      propsData.delay = delay
      wrapper = prepareShallow(Alert, { propsData })
      await wrapper.vm.$nextTick()
      jest.advanceTimersByTime(delay)
      expect(!!wrapper.emitted('close')).toBeTruthy()
    })
  })
})
