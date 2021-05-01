import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import useDrag from './useDrag'

const props = {}

let propsData: any
let wrapper: VueWrapper<any>

const dummyComponent = {
  setup() {
    const { startDrag, doDrag, stopDrag, dragOn, directionX, deltaX, startPointX } = useDrag()
    return { startDrag, doDrag, stopDrag, dragOn, directionX, deltaX, startPointX }
  },
  template: '<div />',
}

const clientX = 50

const common = () => {
  const dummyFn = jest.fn()
  const preventDefault = jest.fn()
  const event = { preventDefault, touches: [{ clientX }] }
  return { dummyFn, preventDefault, event }
}

describe('[useDrag]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(dummyComponent, { propsData })
  })

  afterEach(() => wrapper.unmount())

  /* startDrag */

  it('startDrag: should callback function', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.startDrag({ event, callback: dummyFn })
    expect(wrapper.vm.dragOn).toBeTrue()
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).toHaveBeenCalledWith(event)
  })

  it('startDrag: should not callback function', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.startDrag({ event, condition: false, callback: dummyFn })
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).not.toHaveBeenCalled()
  })

  /* doDrag */

  it('doDrag: should callback function and go left', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.startDrag({ event, offsetWidth: 100 })
    event.touches[0].clientX = 75
    wrapper.vm.doDrag(event, dummyFn)
    expect(wrapper.vm.deltaX).not.toBeNull()
    expect(wrapper.vm.directionX).toBe('right')
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).toHaveBeenCalledWith(event)
  })

  it('doDrag: should callback function and go left', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.startDrag({ event, offsetWidth: 100 })
    event.touches[0].clientX = 25
    wrapper.vm.doDrag(event, dummyFn)
    expect(wrapper.vm.deltaX).not.toBeNull()
    expect(wrapper.vm.directionX).toBe('left')
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).toHaveBeenCalledWith(event)
  })

  it('doDrag: should callback function and go direction', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.startDrag({ event, offsetWidth: 100 })
    wrapper.vm.doDrag(event, dummyFn)
    expect(wrapper.vm.deltaX).toBe(0)
    expect(wrapper.vm.directionX).toBeNull()
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).toHaveBeenCalled()
  })

  it('doDrag: should not callback function and not go direction', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.startDrag({ event, condition: false, offsetWidth: 100 })
    wrapper.vm.doDrag(event, dummyFn)
    expect(wrapper.vm.deltaX).toBeNull()
    expect(wrapper.vm.directionX).toBeNull()
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).not.toHaveBeenCalled()
  })

  /* stopDrag */

  it('stopDrag: should callback function and reset values', async () => {
    const { dummyFn, event } = common()
    wrapper.vm.startDrag({ event, offsetWidth: 100 })
    event.touches[0].clientX = 25
    wrapper.vm.doDrag(event)
    wrapper.vm.stopDrag(event, dummyFn)
    expect(wrapper.vm.deltaX).toBeNull()
    expect(wrapper.vm.dragOn).toBeFalse()
    expect(wrapper.vm.directionX).toBeNull()
    expect(wrapper.vm.startPointX).toBeNull()
    expect(dummyFn).toHaveBeenCalledWith(event)
  })

  it('stopDrag: should not callback function', async () => {
    const { dummyFn, event } = common()
    wrapper.vm.stopDrag(event, dummyFn)
    expect(dummyFn).not.toHaveBeenCalled()
  })
})
