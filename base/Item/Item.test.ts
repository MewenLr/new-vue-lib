import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
// import MockRouter from '@/router/Router.mock'
import Item from './Item.vue'
import dataset from './Item.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

const anchorItem = {
  label: 'dummy',
  to: 'http://dummy-path.com',
}

// const routerLinkItem = {
//   label: 'dummy',
//   to: { name: 'dummyName' },
// }

describe('[Item]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Item, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with tag button', async () => {
      expect(wrapper.find('button').exists()).toBeTrue()
    })

    it('should render component with tag div', async () => {
      propsData.noAccess = true
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('div').exists()).toBeTrue()
    })

    it('should render component with tag a', async () => {
      propsData.item = anchorItem
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('a').exists()).toBeTrue()
    })

    // it('should render component with tag router-link if RouterLinkItem', async () => {
    //   propsData.item = routerLinkItem
    //   wrapper = prepareShallow(Item, { propsData })
    //   await wrapper.vm.$nextTick()
    //   expect(wrapper.find('router-link').exists()).toBeTrue()
    // })

    it('should render component with attribute href', async () => {
      propsData.item = anchorItem
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-item]').attributes('href')).toEqual(anchorItem.to)
    })

    // it('should render component with href attribute and by calling router resolve if routerLinkItem', async () => {
    //   propsData.item = routerLinkItem
    //   wrapper = prepareShallow(Item, { propsData })
    //   expect(MockRouter.resolve).toHaveBeenCalledWith({ name: routerLinkItem.to.name })
    //   expect(wrapper.attributes('href')).toEqual(anchorItem.to)
    // })

    it('should render component with class item--no-access', async () => {
      propsData.noAccess = true
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-item]').classes()).toContain('item--no-access')
    })

    it('should render component with class item--selected', async () => {
      propsData.itemSelected = true
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-item]').classes()).toContain('item--selected')
    })

    it('should render component with class item--targeted', async () => {
      propsData.itemTargeted = true
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-item]').classes()).toContain('item--targeted')
    })
  })

  describe('Actions', () => {

    it('(item string) should emit click on click', async () => {
      wrapper.find('[data-item]').trigger('click')
      const event = wrapper.emitted('click') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toEqual(props.item)
    })

    it('(item ActionItem) should emit click on click', async () => {
      const item = { label: 'Dummy' }
      propsData.item = item
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()

      wrapper.find('[data-item]').trigger('click')
      const event = wrapper.emitted('click') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toMatchObject(item)
    })

    it('(item string) should emit click on click if props noAccess', async () => {
      propsData.noAccess = true
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()

      wrapper.find('[data-item]').trigger('click')
      const event = wrapper.emitted('click') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toEqual(props.item)
    })

    it('(item string) should emit mousedown on mousedown', async () => {
      wrapper.find('[data-item]').trigger('mousedown')
      const event = wrapper.emitted('mousedown') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toEqual(props.item)
    })

    it('(item ActionItem) should emit mousedown on mousedown', async () => {
      const item = { label: 'Dummy' }
      propsData.item = item
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()

      wrapper.find('[data-item]').trigger('mousedown')
      const event = wrapper.emitted('mousedown') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toMatchObject(item)
    })

    it('(item string) should emit mousedown event mousedown if props noAccess', async () => {
      propsData.noAccess = true
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()

      wrapper.find('[data-item]').trigger('mousedown')
      const event = wrapper.emitted('mousedown') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toEqual(props.item)
    })

    it('(item AnchorItem) should redirect _blank on click', async () => {
      window.open = jest.fn()
      propsData.item = anchorItem
      wrapper = prepareShallow(Item, { propsData })
      await wrapper.vm.$nextTick()

      wrapper.find('[data-item]').trigger('click')
      expect(window.open).toHaveBeenCalledWith(anchorItem.to, '_blank')
    })

    // it('should push route on click router-link', async () => {
    //   propsData.item = routerLinkItem
    //   wrapper = prepareShallow(Item, { propsData })
    //   wrapper.find('[data-item]').trigger('click')
    //   expect(MockRouter.push).toHaveBeenCalledWith({ name: routerLinkItem.to.name })
    // })

    it('should emit mouseenter on mouseenter component', async () => {
      wrapper.find('[data-item]').trigger('mouseenter')
      const event = wrapper.emitted('mouseenter') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toEqual(props.index)
    })
  })
})
