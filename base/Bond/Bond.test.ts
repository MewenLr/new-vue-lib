import { VueWrapper } from '@vue/test-utils'
import { prepare } from '@/config/jest/utils/prepare'
// import { RouterLinkStub, VueWrapper } from '@vue/test-utils'
import cloneDeep from 'lodash/cloneDeep'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import Bond from './Bond.vue'
import dataset from './Bond.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Bond]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepare(Bond, { propsData, slots })
  })

  afterEach(() => wrapper.unmount())

  describe('Rendering', () => {

    it('should render component with class bond--variant', async () => {
      expect(wrapper.find('[data-bond]').classes()).toContain(`bond--${props.variant}`)
    })

    it('should render component with class bond--reversed', async () => {
      propsData.reversed = true
      wrapper = prepare(Bond, { propsData, slots })
      expect(wrapper.find('[data-bond]').classes()).toContain('bond--reversed')
    })

    it('should render SvgIcon', async () => {
      expect(wrapper.findComponent(SvgIcon).exists()).toBeTruthy()
    })
  })

  describe('External link', () => {
    const href = '/dummy-path'

    beforeEach(async () => {
      propsData.to = href
      wrapper = prepare(Bond, { propsData, slots })
    })

    describe('Rendering', () => {

      it('should render component with tag <a>', async () => {
        expect(wrapper.find('a').exists()).toBeTrue()
      })

      it('should render component with attribute href', async () => {
        expect(wrapper.find('a').attributes().href).toBe(href)
      })

      it('should render component with attribute target', async () => {
        expect(wrapper.find('a').attributes().target).toBe('_blank')
      })

      it('should return console error if no default slot', async () => {
        console.error = jest.fn()
        wrapper = prepare(Bond, { propsData })
        expect(console.error).toHaveBeenCalled()
      })
    })
  })

  // describe('Internal link', () => {
  //   const route = { name: 'dummy', path: '/dummy' }

  //   beforeEach(async () => {
  //     propsData.to = route
  //     wrapper = prepare(Bond, { propsData, slots })

  //     wrapper.setProps({ to: route })

  //     wrapper = prepare(Bond, {
  //       propsData,
  //       stubs: {
  //         RouterLink: '<router-link></router-link>',
  //       },
  //     })
  //   })

  //   describe('Rendering', () => {

  //     it('should render router-link tag for internal url', async () => {
  //       expect(wrapper.findComponent(RouterLinkStub).exists()).toBeTrue()
  //     })

  //     it('should pass right prop to router-link tag', async () => {
  //       expect(wrapper.findComponent(RouterLinkStub).props().to).toBe(route)
  //     })
  //   })
  // })
})
