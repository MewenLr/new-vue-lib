import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Input from '@/components/Input/Input.vue'
import InputDrop from './InputDrop.vue'
import dataset from './InputDrop.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[extInputNavigation]', () => {

  const preventDefault = jest.fn()

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(InputDrop, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Input keydown ArrowDown:', () => {

    const key = 'ArrowDown'

    it('should target first item on keydown ArrowDown Input', async () => {
      wrapper.vm.indexTargeted = null
      wrapper.vm.indexSelected = null
      await wrapper.vm.$nextTick()
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault })
      expect(wrapper.vm.indexTargeted).toEqual(0)
    })

    it('should do nothing if indexTargeted last item on keydown ArrowDown Input', async () => {
      const lastIndex = props.items.length - 1
      wrapper.vm.indexTargeted = lastIndex
      await wrapper.vm.$nextTick()
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault })
      expect(wrapper.vm.indexTargeted).toEqual(lastIndex)
    })

    it('should do nothing if indexTargeted last item on keydown ArrowDown Input and props clearLabel', async () => {
      propsData.clearLabel = 'Clear selection'
      wrapper = prepareShallow(InputDrop, { propsData })

      const lastIndex = props.items.length
      wrapper.vm.indexTargeted = lastIndex
      await wrapper.vm.$nextTick()
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault })
      expect(wrapper.vm.indexTargeted).toEqual(lastIndex)
    })

    it('should target next item on keydown ArrowDown Input', async () => {
      const index = 1
      wrapper.vm.indexTargeted = index
      await wrapper.vm.$nextTick()
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault })
      expect(wrapper.vm.indexTargeted).toEqual(index + 1)
    })
  })

  describe('Input keydown ArrowUp:', () => {

    const key = 'ArrowUp'

    it('should keep first item targeted on keydown ArrowUp Input', async () => {
      const index = 0
      wrapper.vm.indexTargeted = index
      await wrapper.vm.$nextTick()
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault })
      expect(wrapper.vm.indexTargeted).toEqual(index)
    })

    it('should target previous item on keydown ArrowUp Input', async () => {
      const index = 2
      wrapper.vm.indexTargeted = index
      await wrapper.vm.$nextTick()
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault })
      expect(wrapper.vm.indexTargeted).toEqual(index - 1)
    })
  })

  describe('Input keydown Enter:', () => {

    const key = 'Enter'

    it('should emit update:modelValue on keydown Enter Input', async () => {
      const index = 1
      const item = props.items[index]
      wrapper.vm.indexTargeted = index
      await wrapper.vm.$nextTick()
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault })
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toEqual(item)
    })

    it('should emit update:modelValue on keydown Enter "clear" Input if props clearLabel', async () => {
      const index = 0
      propsData.clearLabel = 'Clear selection'
      wrapper = prepareShallow(InputDrop, { propsData })
      wrapper.vm.indexTargeted = index
      await wrapper.vm.$nextTick()
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault })
      const event = wrapper.emitted('update:modelValue') as any
      expect(event[0][0]).toBeNull()
    })
  })

  describe('Input keydown Escape:', () => {

    const key = 'Escape'

    it('should blur Input on keydown Escape', async () => {
      const target = { blur: jest.fn() }
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault, target })
      expect(target.blur).toHaveBeenCalled()
    })
  })

  describe('Input keydown different from Tab:', () => {

    const key = 'AnyKey'

    it('should preventDefault Input on any keydown different from Tab', async () => {
      wrapper.findComponent(Input).vm.$emit('keydown', { key, preventDefault })
      expect(preventDefault).toHaveBeenCalled()
    })
  })
})
