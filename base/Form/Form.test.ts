import { VueWrapper } from '@vue/test-utils'
import { prepare } from '@/config/jest/utils/prepare'
import cloneDeep from 'lodash/cloneDeep'
import Form from './Form.vue'
import dataset from './Form.dataset'

const { props, slots } = dataset

let propsData: any
let wrapper: VueWrapper<any>

describe('[Form]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepare(Form, { propsData, slots })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Rendering', () => {

    it('should return console error if no default slot', async () => {
      console.error = jest.fn()
      wrapper = prepare(Form, { propsData })
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('Actions', () => {

    it('should emit event on submit component', async () => {
      wrapper.find('[data-form]').trigger('submit')
      const event = wrapper.emitted('submit') as any
      expect(event[0][0] instanceof Event).toBeTrue()
    })

    // it('should emit error on submit form', async () => {
    //   const formErrors = {
    //     dummyInput1: true,
    //     dummyInput2: false,
    //   }
    //   wrapper.find('[data-form]').trigger('submit')
    //   const event = wrapper.emitted('error') as any
    //   expect(event[0][0] instanceof Event).toBeTrue()
    //   expect(event[0][1]).toEqual(formErrors)
    // })
  })
})
