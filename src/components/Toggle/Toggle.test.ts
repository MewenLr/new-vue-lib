import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
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

    it('should render class toggle--checked', async () => {
      propsData.modelValue = true
      wrapper = prepareShallow(Toggle, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-toggle]').classes()).toContain('toggle--checked')
    })

    it('should toggle class toggle--checked on click data-input', async () => {
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-toggle]').classes()).toContain('toggle--checked')
      wrapper.find('[data-input]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-toggle]').classes()).not.toContain('toggle--checked')
    })
  })

  describe('Rendering', () => {

    it('should emit click on click data-input', async () => {
      wrapper.find('[data-input]').trigger('click')
      expect(!!wrapper.emitted('click')).toBeTrue()
    })

    it('should emit update:modelValue on click data-input with payload', async () => {
      wrapper.find('[data-input]').trigger('click')
      expect((wrapper.emitted('update:modelValue') as any)[0][0]).toEqual(!propsData.modelValue)
    })
  })
})
