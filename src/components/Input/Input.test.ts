import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
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

    it('should render data-action', async () => {
      expect(wrapper.find('[data-action]').exists()).toBeTrue()
    })

    it('should render data-action-reversed', async () => {
      propsData.action.reversed = true
      wrapper = prepareShallow(Input, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-action-reversed]').exists()).toBeTrue()
    })

    it('should toggle class input--focused on focus|blur data-field', async () => {
      wrapper.find('[data-field]').trigger('focus')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-input]').classes()).toContain('input--focused')
      wrapper.find('[data-field]').trigger('blur')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-input]').classes()).not.toContain('input--focused')
    })
  })

  describe('Actions', () => {

    it('should emit click on click data-action', async () => {
      wrapper.find('[data-action]').trigger('click')
      expect(!!wrapper.emitted('click')).toBeTrue()
    })

    it('should emit click on click data-action-reversed', async () => {
      propsData.action.reversed = true
      wrapper = prepareShallow(Input, { propsData })
      await wrapper.vm.$nextTick()
      wrapper.find('[data-action-reversed]').trigger('click')
      expect(!!wrapper.emitted('click')).toBeTrue()
    })

    it('should emit focus on focus data-field', async () => {
      wrapper.find('[data-field]').trigger('focus')
      expect(!!wrapper.emitted('focus')).toBeTrue()
    })

    it('should emit blur on blur data-field', async () => {
      wrapper.find('[data-field]').trigger('blur')
      expect(!!wrapper.emitted('blur')).toBeTrue()
    })

    it('should emit keyup on keyup data-field', async () => {
      wrapper.find('[data-field]').trigger('keyup')
      expect(!!wrapper.emitted('keyup')).toBeTrue()
    })

    it('should emit keydown on keydown data-field', async () => {
      wrapper.find('[data-field]').trigger('keydown')
      expect(!!wrapper.emitted('keydown')).toBeTrue()
    })

    it('should emit update:modelValue on input data-field', async () => {
      const value = 'dummy'
      propsData.modelValue = value
      wrapper = prepareShallow(Input, { propsData })
      await wrapper.vm.$nextTick()
      wrapper.find('[data-field]').trigger('input')
      expect((wrapper.emitted('update:modelValue') as any)[0][0]).toEqual(value)
    })
  })
})
