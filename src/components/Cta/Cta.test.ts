import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Cta from './Cta.vue'
import dataset from './Cta.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Cta]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Cta, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Button', () => {

    it('should render with tag button', async () => {
      expect(wrapper.find('button').exists()).toBeTruthy()
    })

    it('should emit click on click data-cta', async () => {
      wrapper.find('[data-cta]').trigger('click')
      expect(!!wrapper.emitted('click')).toBeTrue()
    })
  })

  describe('Div', () => {

    beforeEach(() => {
      propsData.tag = 'div'
      wrapper = prepareShallow(Cta, { propsData })
    })

    it('should render with tag div', async () => {
      expect(wrapper.find('div').exists()).toBeTruthy()
    })

    it('should emit click on click data-cta', async () => {
      wrapper.find('[data-cta]').trigger('click')
      expect(!!wrapper.emitted('click')).toBeTrue()
    })
  })

  // describe('Link', () => {

  //   beforeEach(() => {
  //     propsData.tag = 'link'
  //     propsData.to = { name: '/dummy' }
  //     wrapper = prepareShallow(Cta, { propsData })
  //   })

  //   it('should render with tag a', async () => {
  //     expect(wrapper.find('a').exists()).toBeTruthy()
  //   })
  // })

  describe('Anchor', () => {

    beforeEach(() => {
      propsData.tag = 'anchor'
      propsData.to = 'https://www.dummy.com/'
      wrapper = prepareShallow(Cta, { propsData })
    })

    it('should render with tag a', async () => {
      expect(wrapper.find('a').exists()).toBeTruthy()
      expect(wrapper.attributes('target')).toBe('_blank')
      expect(wrapper.attributes('href')).toBe(propsData.to)
    })
  })
})
