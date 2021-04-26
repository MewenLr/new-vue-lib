import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import InputError from './InputError.vue'
import dataset from './InputError.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[InputError]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(InputError, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render class input-error--visible', async () => {
      propsData.value = ''
      wrapper = prepareShallow(InputError, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').classes()).toContain('input-error--visible')
    })

    it('should render default error', async () => {
      const validator = {
        msg: 'Default error message',
        required: true,
      }
      propsData.value = ''
      propsData.validator = validator
      wrapper = prepareShallow(InputError, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').text()).toContain(validator.msg)
    })

    it('should render error required', async () => {
      propsData.value = ''
      wrapper = prepareShallow(InputError, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').text()).toContain(propsData.validator.required.msg)
    })

    it('should render error min', async () => {
      propsData.value = 'du'
      wrapper = prepareShallow(InputError, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').text()).toContain(propsData.validator.min.msg)
    })

    it('should render error max', async () => {
      propsData.value = 'dummy value'
      wrapper = prepareShallow(InputError, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').text()).toContain(propsData.validator.max.msg)
    })

    it('should render error regex', async () => {
      propsData.value = 'Dummy'
      wrapper = prepareShallow(InputError, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').text()).toContain(propsData.validator.regex.msg)
    })

    it('should render error custom', async () => {
      propsData.value = 'dummies'
      wrapper = prepareShallow(InputError, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').text()).toContain(propsData.validator.custom.msg)
    })

    it('should not render error required', async () => {
      propsData.value = ''
      propsData.immediate = false
      wrapper = prepareShallow(InputError, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-error]').text()).not.toContain(propsData.validator.required.msg)
    })
  })
})
