import { VueWrapper } from '@vue/test-utils'
import { prepare } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Carousel from './Carousel.vue'
import dataset from './Carousel.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Carousel]', () => {

  const nbSlides = slots.default.split('class="slide"').length - 1

  beforeEach(async () => {
    propsData = cloneDeep(props)
    wrapper = prepare(Carousel, { propsData, slots })
    wrapper.vm.nbSlides = nbSlides
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class carousel--paginated', async () => {
      propsData.pagination = 'dash'
      wrapper = prepare(Carousel, { propsData, slots })
      expect(wrapper.find('[data-carousel]').classes()).toContain('carousel--paginated')
    })

    it('should render data-navigation', async () => {
      propsData.hasNavigation = true
      wrapper = prepare(Carousel, { propsData, slots })
      expect(wrapper.find('[data-navigation]').exists()).toBeTruthy()
    })

    it('should render data-pagination', async () => {
      propsData.pagination = 'dash'
      wrapper = prepare(Carousel, { propsData, slots })
      expect(wrapper.find('[data-pagination]').exists()).toBeTruthy()
    })

    it('(!isInfinite) should render the correct number of slides', async () => {
      expect(wrapper.findAll('.slide').length).toEqual(nbSlides)
    })

    it('(isInfinite) should render the correct number of slides', async () => {
      propsData.isInfinite = true
      wrapper = prepare(Carousel, { propsData, slots })
      expect(wrapper.findAll('.slide').length).toEqual(nbSlides * 3)
    })

    it('should return console error if no default slot', async () => {
      console.error = jest.fn()
      wrapper = prepare(Carousel, { propsData })
      expect(console.error).toHaveBeenCalled()
    })
  })
})
