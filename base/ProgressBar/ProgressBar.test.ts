import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import ProgressBar from './ProgressBar.vue'
import dataset from './ProgressBar.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[ProgressBar]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(ProgressBar, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with style width', async () => {
      expect((wrapper.find('[data-progression]').element as HTMLElement).style.width).toEqual(`${props.progression}%`)
    })
  })
})
