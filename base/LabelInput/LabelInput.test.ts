import { VueWrapper } from '@vue/test-utils'
import { prepare } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Input from './LabelInput.vue'
import dataset from './LabelInput.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[LabelInput]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepare(Input, { propsData, slots })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class label-input--label-position', async () => {
      expect(wrapper.find('[data-label-input]').classes()).toContain(`label-input--label-${props.labelPosition}`)
    })

    it('should render label', async () => {
      expect(wrapper.find('[data-label]').text()).toEqual(props.label)
    })

    it('should render default slot', async () => {
      expect(wrapper.find('[data-label-input]').html()).toContain(slots.default)
    })

    it('should return console error if no default slot', async () => {
      console.error = jest.fn()
      wrapper = prepare(Input, { propsData })
      expect(console.error).toHaveBeenCalled()
    })
  })
})
