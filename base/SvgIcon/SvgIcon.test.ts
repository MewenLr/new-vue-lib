import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import SvgIcon from './SvgIcon.vue'
import dataset from './SvgIcon.dataset'

const { props } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[SvgIcon]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(SvgIcon, { propsData })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should render component with class svg-icon--variant', async () => {
      expect(wrapper.find('[data-svg-icon]').classes()).toContain(`svg-icon--${props.variant}`)
    })

    it('should render data-use with attribute href', async () => {
      expect(wrapper.find('[data-use]').attributes('href')).toEqual(`#icon-${props.icon}`)
    })
  })
})
