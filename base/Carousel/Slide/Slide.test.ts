import { VueWrapper } from '@vue/test-utils'
import { prepare } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Slide from './Slide.vue'
import dataset from './Slide.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Slide]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepare(Slide, { propsData, slots })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should return console error if no default slot', async () => {
      console.error = jest.fn()
      wrapper = prepare(Slide, { propsData })
      expect(console.error).toHaveBeenCalled()
    })
  })
})
