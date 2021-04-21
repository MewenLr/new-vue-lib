import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Slider from './Slider.vue'
import dataset from './Slider.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Slider]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Slider, { propsData, slots })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render something', async () => {
      expect(wrapper.text()).toEqual(slots.default.join(''))
    })

    it('should render something', async () => {
      const result = [1, 2, 3].map(() => slots.default.join('')).join('')
      propsData.isInfinite = true
      wrapper = prepareShallow(Slider, { propsData, slots })
      expect(wrapper.text()).toEqual(result)
    })

    it('should return console error if no default slot', async () => {
      console.error = jest.fn()
      wrapper = prepareShallow(Slider, { propsData })
      expect(console.error).toHaveBeenCalled()
    })
  })
})
