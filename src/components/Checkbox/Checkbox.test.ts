import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
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

  describe('ModelValue Boolean', () => {

    it('should render class checkbox--checked', async () => {
      propsData.modelValue = true
      wrapper = prepareShallow(Checkbox, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-checkbox]').classes()).toContain('checkbox--checked')
    })

    it('should toggle class checkbox--checked on click data-input', async () => {
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-checkbox]').classes()).toContain('checkbox--checked')
    })

    it('should emit click on click data-input', async () => {
      wrapper.find('[data-input]').trigger('click')
      expect(!!wrapper.emitted('click')).toBeTrue()
    })

    it('should emit update:modelValue on click data-input with payload', async () => {
      wrapper.find('[data-input]').trigger('click')
      expect((wrapper.emitted('update:modelValue') as any)[0][0]).toEqual(!propsData.modelValue)
    })
  })

  describe('ModelValue String Array', () => {

    beforeEach(() => {
      propsData.value = 'Fizz'
      propsData.modelValue = ['Fizz', 'Buzz']
      wrapper = prepareShallow(Checkbox, { propsData })
    })

    it('should render class checkbox--checked', async () => {
      expect(wrapper.find('[data-checkbox]').classes()).toContain('checkbox--checked')
    })

    it('should not render class checkbox--checked on click data-input', async () => {
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-checkbox]').classes()).not.toContain('checkbox--checked')
    })

    it('should emit click on click data-input', async () => {
      wrapper.find('[data-input]').trigger('click')
      expect(!!wrapper.emitted('click')).toBeTrue()
    })

    it('should emit update:modelValue with payload added on click data-input', async () => {
      propsData.value = 'Fizz'
      propsData.modelValue = ['Buzz']
      wrapper = prepareShallow(Checkbox, { propsData })
      wrapper.find('[data-input]').trigger('click')
      expect((wrapper.emitted('update:modelValue') as any)[0][0]).toEqual(['Buzz', 'Fizz'])
    })

    it('should emit update:modelValue with payload substracted on click data-input ', async () => {
      propsData.value = 'Buzz'
      propsData.modelValue = ['Buzz', 'Fizz']
      wrapper = prepareShallow(Checkbox, { propsData })
      wrapper.find('[data-input]').trigger('click')
      expect((wrapper.emitted('update:modelValue') as any)[0][0]).toEqual(['Fizz'])
    })
  })

  describe('Actions', () => {

    it('should emit focus and render class checkbox--focused on focus data-input', async () => {
      wrapper.find('[data-input]').trigger('focus')
      await wrapper.vm.$nextTick()
      expect(!!wrapper.emitted('focus')).toBeTrue()
      expect(wrapper.find('[data-checkbox]').classes()).toContain('checkbox--focused')
    })

    it('should emit blur and not render class checkbox--focused on blur data-input ', async () => {
      wrapper.find('[data-input]').trigger('focus')
      wrapper.find('[data-input]').trigger('blur')
      await wrapper.vm.$nextTick()
      expect(!!wrapper.emitted('blur')).toBeTrue()
      expect(wrapper.find('[data-checkbox]').classes()).not.toContain('checkbox--focused')
    })
  })
})
