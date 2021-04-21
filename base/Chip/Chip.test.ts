import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import Chip from './Chip.vue'
import dataset from './Chip.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Chip]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Chip, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with chip--variant', async () => {
      expect(wrapper.find('[data-chip]').classes()).toContain(`chip--${props.variant}`)
    })

    it('should render cta with SvgIcon if closable', async () => {
      propsData.closable = true
      wrapper = prepareShallow(Chip, { propsData })
      expect(wrapper.find('[data-close]').exists()).toBeTruthy()
      expect(wrapper.findComponent(SvgIcon).exists()).toBeTruthy()
    })
  })

  describe('Actions', () => {

    it('should emit close on click data-cta', async () => {
      propsData.closable = true
      wrapper = prepareShallow(Chip, { propsData })
      wrapper.find('[data-close]').trigger('click')
      const event = wrapper.emitted('close') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })
  })
})
