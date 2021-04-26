import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Tabs from './Tabs.vue'
import dataset from './Tabs.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Tabs]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Tabs, { propsData })
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
