import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import ScrollBar from './ScrollBar.vue'
import dataset from './ScrollBar.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[ScrollBar]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(ScrollBar, { propsData })
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
