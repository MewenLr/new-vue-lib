import { mockWatch } from '@/scripts/utils'
import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import Input from './Input.vue'
import dataset from './Input.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Input]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Input, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class input--icon', async () => {
      expect(wrapper.find('[data-input]').classes()).toContain('input--icon')
    })

    it('should render component with class input--reversed', async () => {
      propsData.reversed = true
      wrapper = prepareShallow(Input, { propsData })
      expect(wrapper.find('[data-input]').classes()).toContain('input--reversed')
    })

    it('should render SvgIcon', async () => {
      expect(wrapper.findComponent(SvgIcon).exists()).toBeTruthy()
    })

    it('should render component with class input--has-action', async () => {
      wrapper = prepareShallow(Input, { propsData })
      expect(wrapper.find('[data-input]').classes()).toContain('input--has-action')
    })

    it('should render component with class input--reversed-action', async () => {
      propsData.reversedAction = true
      wrapper = prepareShallow(Input, { propsData })
      expect(wrapper.find('[data-input]').classes()).toContain('input--reversed-action')
    })

    it('should render data-button-before with tag button', async () => {
      propsData.reversedAction = true
      wrapper = prepareShallow(Input, { propsData })
      expect(wrapper.find('[data-button-before]').exists()).toBeTruthy()
      expect(wrapper.find('[data-button-before]').html()).toContain('<button')
    })

    it('should render data-button-after', async () => {
      expect(wrapper.find('[data-button-after]').exists()).toBeTruthy()
      expect(wrapper.find('[data-button-after]').html()).toContain('<button')
    })

    it('should render data-button-before with tag div', async () => {
      propsData.ctaTag = 'div'
      propsData.reversedAction = true
      wrapper = prepareShallow(Input, { propsData })
      expect(wrapper.find('[data-button-before]').exists()).toBeTruthy()
      expect(wrapper.find('[data-button-before]').html()).toContain('<div')
    })

    it('should render data-button-after with tag div', async () => {
      propsData.ctaTag = 'div'
      wrapper = prepareShallow(Input, { propsData })
      expect(wrapper.find('[data-button-after]').exists()).toBeTruthy()
      expect(wrapper.find('[data-button-after]').html()).toContain('<div')
    })

    it('should render data-error with no error msg on mounted', async () => {
      const validators = { msg: 'Default msg', required: true }
      propsData.validators = validators
      wrapper = prepareShallow(Input, { propsData })
      expect(wrapper.find('[data-error]').exists()).toBeTruthy()
      expect(wrapper.find('[data-error]').text()).not.toContain(validators.msg)
    })

    it('should render data-error with no error msg', async () => {
      const validators = { msg: 'Default msg', required: true }
      propsData.validators = validators
      wrapper = prepareShallow(Input, { propsData })
      wrapper = await mockWatch('data', 'isFocused', wrapper, [true, false])
      expect(wrapper.find('[data-error]').text()).not.toContain(validators.msg)
    })

    it('should render data-error with error msg', async () => {
      const validators = { msg: 'Default msg', required: true }
      propsData.modelValue = ''
      propsData.validators = validators
      wrapper = prepareShallow(Input, { propsData })
      wrapper = await mockWatch('data', 'isFocused', wrapper, [true])
      expect(wrapper.find('[data-error]').text()).toContain(validators.msg)
    })
  })

  describe('Actions', () => {

    it('should emit blur on blur data-field', async () => {
      wrapper.find('[data-field]').trigger('blur')
      const event = wrapper.emitted('blur') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit focus on focus data-field', async () => {
      wrapper.find('[data-field]').trigger('focus')
      const event = wrapper.emitted('focus') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit keyup on keyup data-field', async () => {
      wrapper.find('[data-field]').trigger('keyup')
      const event = wrapper.emitted('keyup') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit keydown on keydown data-field', async () => {
      wrapper.find('[data-field]').trigger('keydown')
      const event = wrapper.emitted('keydown') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit update:modelValue on input data-field', async () => {
      wrapper.find('[data-field]').trigger('input')
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toEqual(props.modelValue)
    })

    it('should emit click on click data-button-before', async () => {
      propsData.reversedAction = true
      wrapper = prepareShallow(Input, { propsData })
      wrapper.find('[data-button-before]').trigger('click')
      const event = wrapper.emitted('click') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit click on click data-button-after', async () => {
      wrapper.find('[data-button-after]').trigger('click')
      const event = wrapper.emitted('click') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })
  })
})
