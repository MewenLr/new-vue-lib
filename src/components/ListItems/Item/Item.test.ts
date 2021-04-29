import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Item from './Item.vue'
import dataset from './Item.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Item]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Item, { propsData, slots })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Actions', () => {

    it('should emit click on click data-item', async () => {
      wrapper.find('[data-item]').trigger('click')
      expect((wrapper.emitted('click') as any)[0][0]).toEqual(props.item)
    })
  })
})
