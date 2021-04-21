import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Item from '@/components/Item/Item.vue'
import ListItems from './ListItems.vue'
import dataset from './ListItems.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[ListItems]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(ListItems, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render the correct number of items', async () => {
      expect(wrapper.findAll('[data-item]').length).toEqual(props.items.length)
    })
  })

  describe('Watch', () => {

    it('indexTargeted: should update index targeted', async () => {
      const index = 1
      wrapper.setProps({ indexTargeted: index })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isItemTargeted(index)).toBeTrue()
    })

    it('itemSelected: (itemSelected string) should emit selected', async () => {
      const index = 1
      wrapper.setProps({ itemSelected: props.items[index] })
      await wrapper.vm.$nextTick()
      const event = wrapper.emitted('selected') as any
      expect(event[0][0]).toEqual(index)
    })

    it('itemSelected: (itemSelected ActionItem) emit selected', async () => {
      const index = 1
      const items = [
        { label: 'dummy' },
        { label: 'dummy2' },
      ]
      propsData.items = items
      wrapper = prepareShallow(ListItems, { propsData })
      wrapper.setProps({ itemSelected: items[index] })
      await wrapper.vm.$nextTick()
      const event = wrapper.emitted('selected') as any
      expect(event[0][0]).toEqual(index)
    })

    it('itemSelected: (itemSelected string) emit selected if props clearLabel', async () => {
      const index = 1
      propsData.clearLabel = 'Clear selection'
      wrapper = prepareShallow(ListItems, { propsData })
      wrapper.setProps({ itemSelected: props.items[index] })
      await wrapper.vm.$nextTick()
      const event = wrapper.emitted('selected') as any
      expect(event[0][0]).toEqual(index + 1)
    })

    it('itemSelected: (itemSelected string) emit selected', async () => {
      propsData.itemSelected = 'dummy2'
      wrapper = prepareShallow(ListItems, { propsData })
      wrapper.setProps({ itemSelected: null })
      await wrapper.vm.$nextTick()
      const event = wrapper.emitted('selected') as any
      expect(event[0][0]).toBeNull()
    })
  })

  describe('Actions', () => {

    it('should untarget items on mouseleave component', async () => {
      const index = 1
      propsData.indexTargeted = index
      wrapper = prepareShallow(ListItems, { propsData })
      expect(wrapper.vm.isItemTargeted(index)).toBeTrue()
      wrapper.find('[data-list-items]').trigger('mouseleave')
      expect(wrapper.vm.isItemTargeted(index)).toBeFalse()
    })

    it('should emit click on click Item', async () => {
      const index = 0
      const payload = 'Dummy payload'
      const eventTriggered = { type: 'click' }
      wrapper.findComponent(Item).vm.$emit('click', eventTriggered, payload, index)
      const event = wrapper.emitted('click') as any
      expect(event[0][1]).toEqual(payload)
      expect(event[0][2]).toEqual(index)
    })

    it('should emit mousedown on mousedown Item', async () => {
      const index = 0
      const payload = 'Dummy payload'
      const eventTriggered = { type: 'mousedown' }
      wrapper.findComponent(Item).vm.$emit('mousedown', eventTriggered, payload, index)
      const event = wrapper.emitted('mousedown') as any
      expect(event[0][1]).toEqual(payload)
      expect(event[0][2]).toEqual(index)
    })

    it('should emit targeted on mouseenter Item', async () => {
      const index = 0
      wrapper.findComponent(Item).vm.$emit('mouseenter', null, index)
      const event = wrapper.emitted('targeted') as any
      expect(event[0][0]).toEqual(index)
    })
  })
})
