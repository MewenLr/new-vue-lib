import { VueWrapper } from '@vue/test-utils'
import { prepareAsync, prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Fetch from './Fetch.vue'
import dataset from './Fetch.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Fetch]', () => {

  beforeEach(async () => {
    propsData = cloneDeep(props)
    wrapper = await prepareAsync(Fetch, { propsData, slots })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    // it('should render data-content', async () => {
    //   console.log('wrapper hasError >', wrapper.vm.hasError)
    //   console.log('wrapper data-content >', wrapper.find('[data-content]').text())
    //   expect(wrapper.find('[data-content]').text()).toBe(slots.default)
    // })

    it('should render data-error', async () => {
      wrapper = prepareShallow(Fetch, { propsData, slots })
      wrapper.vm.hasError = true
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').text()).toBe(slots.error)
    })
  })
})
