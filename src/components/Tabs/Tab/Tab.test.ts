import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Tab from './Tab.vue'
import dataset from './Tab.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Tab]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Tab, { propsData })
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
