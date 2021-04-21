import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Picture from './Picture.vue'
import dataset from './Picture.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Picture]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Picture, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render data-placeholder', async () => {
      expect(wrapper.find('[data-placeholder]').exists()).toBeTrue()
    })

    it('(remote source) should render component with attribute src', async () => {
      const placeholder = 'http://placeholder.png'
      propsData.placeholder = placeholder
      wrapper = prepareShallow(Picture, { propsData })
      expect(wrapper.find('[data-placeholder]').attributes('src')).toEqual(placeholder)
    })

    it('should render component with attribute alt', async () => {
      expect(wrapper.find('[data-image]').attributes('alt')).toEqual(props.alt)
    })

    it('(remote source) should render component with attribute data-url', async () => {
      const src = 'http://desert.jpg'
      propsData.src = src
      wrapper = prepareShallow(Picture, { propsData })
      expect(wrapper.find('[data-image]').attributes('data-url')).toEqual(src)
    })
  })
})
