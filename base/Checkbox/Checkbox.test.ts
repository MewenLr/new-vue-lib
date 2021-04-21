import { mockWatch } from '@/scripts/utils'
import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Checkbox from './Checkbox.vue'
import dataset from './Checkbox.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Checkbox]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Checkbox, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class checkbox--focused', async () => {
      wrapper.vm.isFocused = true
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-checkbox]').classes()).toContain('checkbox--focused')
    })

    it('should render component with class checkbox--checked', async () => {
      wrapper.vm.isChecked = true
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-checkbox]').classes()).toContain('checkbox--checked')
    })

    it('should render component with class checkbox--label-position', async () => {
      expect(wrapper.find('[data-checkbox]').classes()).toContain(`checkbox--label-${props.labelPosition}`)
    })

    it('should render data-label with attribute for equal to id', async () => {
      propsData.labelFor = true
      wrapper = prepareShallow(Checkbox, { propsData })
      expect(wrapper.find('[data-label]').attributes('for')).toEqual(props.id)
    })

    it('should render data-error with no error msg on mounted', async () => {
      const validators = { msg: 'Default msg', required: true }
      propsData.validators = validators
      wrapper = prepareShallow(Checkbox, { propsData })
      expect(wrapper.find('[data-error]').exists()).toBeTruthy()
      expect(wrapper.find('[data-error]').text()).not.toContain(validators.msg)
    })

    it('should render data-error with no error msg', async () => {
      const validators = { msg: 'Default msg', required: true }
      propsData.modelValue = true
      propsData.validators = validators
      wrapper = prepareShallow(Checkbox, { propsData })
      wrapper = await mockWatch('data', 'isFocused', wrapper, [true, false])
      expect(wrapper.find('[data-error]').text()).not.toContain(validators.msg)
    })

    it('should render data-error with error msg', async () => {
      const validators = { msg: 'Default msg', required: true }
      propsData.modelValue = false
      propsData.validators = validators
      wrapper = prepareShallow(Checkbox, { propsData })
      wrapper = await mockWatch('data', 'isFocused', wrapper, [true])
      expect(wrapper.find('[data-error]').text()).toContain(validators.msg)
    })
  })

  describe('Watch', () => {

    it('modelValue: (modelValue boolean) should update checked', async () => {
      wrapper = await mockWatch('props', 'modelValue', wrapper, [true])
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeTrue()
    })

    it('modelValue: (modelValue array) should update checked', async () => {
      wrapper = await mockWatch('props', 'modelValue', wrapper, [[props.value]])
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeTrue()
    })
  })

  describe('Actions', () => {

    it('should emit focus on focus component', async () => {
      wrapper.find('[data-input]').trigger('focus')
      expect(wrapper.vm.isFocused).toBeTrue()
      const event = wrapper.emitted('focus') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit blur on blur component', async () => {
      wrapper.vm.focus = true
      await wrapper.vm.$nextTick()
      wrapper.find('[data-input]').trigger('blur')
      expect(wrapper.vm.isFocused).toBeFalse()
      const event = wrapper.emitted('blur') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('(modelValue boolean) should check and emit update:modelValue on click component', async () => {
      propsData.modelValue = false
      wrapper = prepareShallow(Checkbox, { propsData })
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeTrue()
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toBeTrue()
    })

    it('(modelValue boolean) should uncheck and emit update:modelValue on click component', async () => {
      propsData.modelValue = true
      wrapper = prepareShallow(Checkbox, { propsData })
      const checkbox = wrapper.find('[data-input]').element as HTMLInputElement
      checkbox.checked = true
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeFalse()
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toBeFalse()
    })

    it('(modelValue array) should check checkbox and emit update:modelValue on click component', async () => {
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeTrue()
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toMatchObject([...props.modelValue, props.value])
    })

    it('(modelValue array) should uncheck checkbox and emit update:modelValue on click component', async () => {
      const modelValue = ['Dummy', 'Dummy2']
      propsData.modelValue = modelValue
      wrapper = prepareShallow(Checkbox, { propsData })
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeFalse()
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toMatchObject(modelValue.filter((el) => el !== props.value))
    })
  })
})
