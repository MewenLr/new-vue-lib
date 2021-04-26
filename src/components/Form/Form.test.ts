import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Form from './Form.vue'
import dataset from './Form.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Form]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(Form, { propsData })
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
