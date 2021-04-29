import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Radio from './Radio.vue'
import dataset from './Radio.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Radio]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    propsData.modelValue = ''
    wrapper = prepareShallow(Radio, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render class radio--checked on click data-input', async () => {
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-radio]').classes()).toContain('radio--checked')
    })
  })

  describe('Actions', () => {

    it('should emit click on click data-input', async () => {
      wrapper.find('[data-input]').trigger('click')
      expect(!!wrapper.emitted('click')).toBeTrue()
    })

    it('should emit update:modelValue on click data-input with payload', async () => {
      wrapper.find('[data-input]').trigger('click')
      expect((wrapper.emitted('update:modelValue') as any)[0][0]).toEqual(propsData.value)
    })

    it('should emit focus and render class radio--focused on focus data-input', async () => {
      wrapper.find('[data-input]').trigger('focus')
      await wrapper.vm.$nextTick()
      expect(!!wrapper.emitted('focus')).toBeTrue()
      expect(wrapper.find('[data-radio]').classes()).toContain('radio--focused')
    })

    it('should emit blur and not render class radio--focused on blur data-input', async () => {
      wrapper.find('[data-input]').trigger('focus')
      wrapper.find('[data-input]').trigger('blur')
      await wrapper.vm.$nextTick()
      expect(!!wrapper.emitted('blur')).toBeTrue()
      expect(wrapper.find('[data-radio]').classes()).not.toContain('radio--focused')
    })
  })
})
