import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Pagination from './Pagination.vue'
import dataset from './Pagination.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Pagination]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Pagination, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class pagination--variant', async () => {
      expect(wrapper.find('[data-pagination]').classes()).toContain(`pagination--${props.variant}`)
    })

    it('should render data-cta', async () => {
      expect(wrapper.find('[data-cta]').exists()).toBeTruthy()
    })

    it('should render data-fraction', async () => {
      propsData.variant = 'fraction'
      wrapper = prepareShallow(Pagination, { propsData })
      expect(wrapper.find('[data-fraction]').exists()).toBeTruthy()
    })

    it('should render the correct number of cta', async () => {
      expect(wrapper.findAll('[data-cta]').length).toEqual(props.nbSlides)
    })

    // it('should render data-cta with class pagination__cta--active', async () => {
    //   const position = 2
    //   wrapper.setProps({ paginationPosition: position })
    //   await wrapper.vm.$nextTick()
    //   expect(wrapper.findAll('[data-cta]').at(position).classes()).toContain('pagination__cta--active')
    // })
  })

  describe('Actions', () => {

    const stopPropagation = jest.fn()

    it('should emit select-slide on keydown.enter data-cta', async () => {
      wrapper.find('[data-cta]').trigger('keydown.enter', { stopPropagation })
      const event = wrapper.emitted('select-slide') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toEqual(0)
      expect(stopPropagation).toHaveBeenCalled()
    })

    it('should emit select-slide on mousedown data-cta', async () => {
      wrapper.find('[data-cta]').trigger('mousedown', { stopPropagation })
      const event = wrapper.emitted('select-slide') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toEqual(0)
      expect(stopPropagation).toHaveBeenCalled()
    })

    it('should emit select-slide on touchstart data-cta', async () => {
      wrapper.find('[data-cta]').trigger('touchstart', { stopPropagation })
      const event = wrapper.emitted('select-slide') as any
      expect(event[0][0] instanceof Event).toBeTrue()
      expect(event[0][1]).toEqual(0)
      expect(stopPropagation).toHaveBeenCalled()
    })
  })

})
