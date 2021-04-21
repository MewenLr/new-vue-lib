import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Radio from './Radio.vue'
import dataset from './Radio.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Radio]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Radio, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class radio--focused', async () => {
      wrapper.vm.isFocused = true
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-radio]').classes()).toContain('radio--focused')
    })

    it('should render component with class radio--checked', async () => {
      wrapper.vm.isChecked = true
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-radio]').classes()).toContain('radio--checked')
    })

    it('should render component with class radio--label-label-position', async () => {
      expect(wrapper.find('[data-radio]').classes()).toContain(`radio--label-${props.labelPosition}`)
    })

    it('should render data-label with attribute for', async () => {
      propsData.labelFor = true
      wrapper = prepareShallow(Radio, { propsData })
      expect(wrapper.find('[data-label]').attributes('for')).toEqual(props.id)
    })
  })

  describe('Watch', () => {

    it('modelValue: should update checked', async () => {
      propsData.modelValue = props.value
      wrapper = prepareShallow(Radio, { propsData })
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

    it('should checked radio and emit update:modelValue on click component', async () => {
      (wrapper.find('[data-input]').element as HTMLInputElement).checked = true
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isChecked).toBeTrue()
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toEqual(props.value)
    })
  })
})
