import { mockWatch } from '@/scripts/utils'
import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Toggle from './Toggle.vue'
import dataset from './Toggle.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Toggle]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Toggle, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class toggle--focused', async () => {
      wrapper.vm.isFocused = true
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-toggle]').classes()).toContain('toggle--focused')
    })

    it('should render component with class toggle--checked', async () => {
      wrapper.vm.isChecked = true
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-toggle]').classes()).toContain('toggle--checked')
    })

    it('should render component with class toggle--label-label-position', async () => {
      expect(wrapper.find('[data-toggle]').classes()).toContain(`toggle--label-${props.labelPosition}`)
    })

    it('should render data-label with attribute for', async () => {
      propsData.labelFor = true
      wrapper = prepareShallow(Toggle, { propsData })
      expect(wrapper.find('[data-label]').attributes('for')).toEqual(props.id)
    })

    it('should render data-error with no error msg on mounted', async () => {
      const validators = { msg: 'Default msg', required: true }
      propsData.validators = validators
      wrapper = prepareShallow(Toggle, { propsData })
      expect(wrapper.find('[data-error]').exists()).toBeTruthy()
      expect(wrapper.find('[data-error]').text()).not.toContain(validators.msg)
    })

    it('should render data-error with no error msg', async () => {
      const validators = { msg: 'Default msg', required: true }
      propsData.validators = validators
      wrapper = prepareShallow(Toggle, { propsData })
      wrapper = await mockWatch('data', 'isFocused', wrapper, [true, false])
      expect(wrapper.find('[data-error]').text()).not.toContain(validators.msg)
    })

    it('should render data-error with error msg', async () => {
      const validators = { msg: 'Default msg', required: true }
      propsData.modelValue = false
      propsData.validators = validators
      wrapper = prepareShallow(Toggle, { propsData })
      wrapper = await mockWatch('data', 'isFocused', wrapper, [true])
      expect(wrapper.find('[data-error]').text()).toContain(validators.msg)
    })
  })

  describe('Watch', () => {

    it('modelValue: should update toggle', async () => {
      wrapper.setProps({ modelValue: true })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeTrue()
    })
  })

  describe('Actions', () => {

    it('should toggle focus and emit focus on focus component', async () => {
      wrapper.find('[data-input]').trigger('focus')
      expect(wrapper.vm.isFocused).toBeTrue()
      const event = wrapper.emitted('focus') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should toggle focus and emit blur on blur component', async () => {
      wrapper.vm.isFocused = true
      await wrapper.vm.$nextTick()
      wrapper.find('[data-input]').trigger('blur')
      expect(wrapper.vm.isFocused).toBeFalse()
      const event = wrapper.emitted('blur') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should checked toggle and emit update:modelValue on click component', async () => {
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeTrue()
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toBeTrue()
    })

    it('should unchecked toggle and emit update:modelValue on click component', async () => {
      (wrapper.find('[data-input]').element as HTMLInputElement).checked = true
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeFalse()
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toBeFalse()
    })
  })
})
