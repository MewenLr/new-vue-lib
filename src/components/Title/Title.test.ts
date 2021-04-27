import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Title from './Title.vue'
import dataset from './Title.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Title]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Title, { propsData, slots })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with correct tag', async () => {
      expect(wrapper.find(props.tag).exists()).toBeTrue()
    })

    it('should render default slot', async () => {
      expect(wrapper.find('[data-title]').html()).toContain(slots.default)
    })

    it('should render component with class title--tag', async () => {
      expect(wrapper.find('[data-title]').classes()).toContain(`title--${propsData.tag}`)
    })
  })
})
