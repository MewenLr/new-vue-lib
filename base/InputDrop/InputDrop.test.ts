import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Input from '@/components/Input/Input.vue'
import ListItems from '@/components/ListItems/ListItems.vue'
import InputDrop from './InputDrop.vue'
import dataset from './InputDrop.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[InputDrop]', () => {

  const preventDefault = jest.fn()

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(InputDrop, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class input-drop--open', async () => {
      wrapper.vm.isListVisible = true
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-input-drop]').classes()).toContain('input-drop--open')
    })

    it('should render ListItems if items', async () => {
      await wrapper.vm.$nextTick()
      expect(wrapper.findComponent(ListItems).exists()).toBeTrue()
    })

    it('should show ListItems', async () => {
      wrapper.vm.isListVisible = true
      await wrapper.vm.$nextTick()
      expect(wrapper.findComponent(ListItems).element).toBeVisible()
    })
  })

  describe('Actions', () => {

    it('should hide list on blur Input', async () => {
      wrapper.vm.indexTargeted = 1
      wrapper.vm.isListVisible = true
      await wrapper.vm.$nextTick()
      wrapper.findComponent(Input).vm.$emit('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
      expect(wrapper.vm.isListVisible).toBeFalse()
      expect(wrapper.vm.indexTargeted).toBeNull()
    })

    it('should show list on focus Input', async () => {
      wrapper.findComponent(Input).vm.$emit('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
      expect(wrapper.vm.isListVisible).toBeTrue()
    })

    // it('should hide list on mousedown Input', async () => {
    //   wrapper.vm.indexTargeted = 1
    //   wrapper.vm.isListVisible = true
    //   await wrapper.vm.$nextTick()
    //   wrapper.findComponent(Input).trigger('mousedown', { preventDefault })
    //   await wrapper.vm.$nextTick()
    //   expect(wrapper.emitted('blur')).toBeTruthy()
    //   expect(wrapper.vm.isListVisible).toBeFalse()
    //   expect(wrapper.vm.indexTargeted).toBeNull()
    // })

    it('should set indexTargeted item on targeted ListItems', async () => {
      const index = 1
      wrapper.findComponent(ListItems).vm.$emit('targeted', index)
      expect(wrapper.vm.indexTargeted).toEqual(index)
    })

    it('should set indexSelected on selected ListItems', async () => {
      const index = 1
      wrapper.findComponent(ListItems).vm.$emit('selected', index)
      expect(wrapper.vm.indexSelected).toEqual(index)
    })

    it('should emit update:modelValue on click ListItems', async () => {
      const index = 1
      const item = props.items[index]
      wrapper.findComponent(ListItems).vm.$emit('click', { preventDefault }, item, index)
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toEqual(item)
    })

    it('should emit update:modelValue on mousedown ListItems', async () => {
      const index = 1
      const item = props.items[index]
      wrapper.findComponent(ListItems).vm.$emit('mousedown', { preventDefault }, item, index)
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toEqual(item)
    })

    it('should emit update:modelValue on click "clear" ListItems if props clearLabel', async () => {
      const index = 0
      const item = props.items[index]
      propsData.clearLabel = 'Clear selection'
      wrapper = prepareShallow(InputDrop, { propsData })
      wrapper.findComponent(ListItems).vm.$emit('click', { preventDefault }, item, index)
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toBeNull()
    })

    it('should emit update:modelValue on mousedown "clear" ListItems if props clearLabel', async () => {
      const index = 0
      const item = props.items[index]
      propsData.clearLabel = 'Clear selection'
      wrapper = prepareShallow(InputDrop, { propsData })
      wrapper.findComponent(ListItems).vm.$emit('mousedown', { preventDefault }, item, index)
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toBeNull()
    })
  })
})
