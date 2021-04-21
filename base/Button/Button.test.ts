import { VueWrapper } from '@vue/test-utils'
import { prepare } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import Button from './Button.vue'
import dataset from './Button.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Button]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepare(Button, { propsData, slots })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class button--size', async () => {
      expect(wrapper.find('[data-button]').classes()).toContain(`button--${props.size}`)
    })

    it('should render component with class button--variant', async () => {
      expect(wrapper.find('[data-button]').classes()).toContain(`button--${props.variant}`)
    })

    it('should render component with class button--outlined', async () => {
      propsData.outlined = true
      wrapper = prepare(Button, { propsData, slots })
      expect(wrapper.find('[data-button]').classes()).toContain('button--outlined')
    })

    it('should render component with class button--reversed', async () => {
      propsData.reversed = true
      wrapper = prepare(Button, { propsData, slots })
      expect(wrapper.find('[data-button]').classes()).toContain('button--reversed')
    })

    it('should render component with attribute disabled', async () => {
      propsData.disabled = true
      wrapper = prepare(Button, { propsData, slots })
      expect(wrapper.find('[data-button]').attributes('disabled')).toBe('')
    })

    it('should render component with no attribute disabled', async () => {
      expect(wrapper.find('[data-button]').attributes('disabled')).toBe(undefined)
    })

    it('should render SvgIcon', async () => {
      expect(wrapper.findComponent(SvgIcon).exists()).toBeTruthy()
    })

    it('should render default slot', async () => {
      expect(wrapper.find('[data-button]').text()).toEqual(slots.default)
    })

    it('should return console error if no default slot', async () => {
      console.error = jest.fn()
      wrapper = prepare(Button, { propsData })
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('Actions', () => {

    it('should emit click on click component', async () => {
      wrapper.find('[data-button]').trigger('click')
      const event = wrapper.emitted('click') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should not emit click on click component if props disabled', async () => {
      propsData.disabled = true
      wrapper = prepare(Button, { propsData, slots })
      wrapper.find('[data-button]').trigger('click')
      const event = wrapper.emitted('click') as any
      expect(event).toBeFalsy()
    })
  })
})
