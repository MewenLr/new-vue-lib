import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
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

  xdescribe('Rendering', () => {

    it('should render something', async () => {
      /* expect... */
    })
  })
})
