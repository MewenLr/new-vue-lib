import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import NewItem from './NewItem.vue'
import dataset from './NewItem.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[NewItem]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(NewItem, { propsData })
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
