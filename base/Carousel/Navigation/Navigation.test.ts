import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Navigation from './Navigation.vue'
import dataset from './Navigation.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Navigation]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Navigation, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Actions', () => {

    it('should render data-previous with class navigation__cta--disabled', async () => {
      propsData.hasNoPrevious = true
      wrapper = prepareShallow(Navigation, { propsData })
      expect(wrapper.find('[data-previous]').classes()).toContain('navigation__cta--disabled')
    })

    it('should render data-next with class navigation__cta--disabled', async () => {
      propsData.hasNoNext = true
      wrapper = prepareShallow(Navigation, { propsData })
      expect(wrapper.find('[data-next]').classes()).toContain('navigation__cta--disabled')
    })
  })

  describe('Actions', () => {

    /* previous */

    it('should emit change-slide on keydown.enter data-previous', async () => {
      wrapper.find('[data-previous]').trigger('keydown.enter')
      const event = wrapper.emitted('change-slide') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit change-slide on mousedown data-previous', async () => {
      wrapper.find('[data-previous]').trigger('mousedown')
      const event = wrapper.emitted('change-slide') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit change-slide on touchstart data-previous', async () => {
      wrapper.find('[data-previous]').trigger('touchstart')
      const event = wrapper.emitted('change-slide') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should not emit change-slide on event data-previous', async () => {
      propsData.hasNoPrevious = true
      wrapper = prepareShallow(Navigation, { propsData })
      wrapper.find('[data-previous]').trigger('keydown.enter')
      expect(wrapper.emitted('change-slide')).toBeFalsy()
    })

    /* next */

    it('should emit change-slide on keydown.enter data-next', async () => {
      wrapper.find('[data-next]').trigger('keydown.enter')
      const event = wrapper.emitted('change-slide') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit change-slide on mousedown data-next', async () => {
      wrapper.find('[data-next]').trigger('mousedown')
      const event = wrapper.emitted('change-slide') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should emit change-slide on touchstart data-next', async () => {
      wrapper.find('[data-next]').trigger('touchstart')
      const event = wrapper.emitted('change-slide') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    it('should not emit change-slide on event data-next', async () => {
      propsData.hasNoNext = true
      wrapper = prepareShallow(Navigation, { propsData })
      wrapper.find('[data-next]').trigger('keydown.enter')
      expect(wrapper.emitted('change-slide')).toBeFalsy()
    })
  })
})
