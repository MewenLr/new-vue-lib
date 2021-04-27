import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import useDrag from './useDrag'

const props = {}

let propsData: any
let wrapper: VueWrapper<any>

const dummyComponent = {
  setup() {
    const { startDrag, doDrag, stopDrag, direction, delta, dragOn } = useDrag()
    return { startDrag, doDrag, stopDrag, direction, delta, dragOn }
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
    wrapper.vm.startDrag(event, true, dummyFn)
    expect(wrapper.vm.dragOn).toBeTrue()
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).toHaveBeenCalledWith(event)
  })

  it('startDrag: should not callback function', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.startDrag(event, false, dummyFn)
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).not.toHaveBeenCalled()
  })

  /* doDrag */

  it('doDrag: should callback function and go left', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.startDrag(event, true, dummyFn)
    event.touches[0].clientX = 75
    wrapper.vm.doDrag(event, 100, dummyFn)
    expect(wrapper.vm.delta).not.toBeNull()
    expect(wrapper.vm.direction).toEqual('left')
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).toHaveBeenCalledWith(event)
  })

  it('doDrag: should callback function and go right', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.startDrag(event, true, dummyFn)
    event.touches[0].clientX = 25
    wrapper.vm.doDrag(event, 100, dummyFn)
    expect(wrapper.vm.delta).not.toBeNull()
    expect(wrapper.vm.direction).toEqual('right')
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).toHaveBeenCalledWith(event)
  })

  it('doDrag: should not callback function', async () => {
    const { dummyFn, preventDefault, event } = common()
    wrapper.vm.doDrag(event, 100, dummyFn)
    expect(preventDefault).toHaveBeenCalled()
    expect(dummyFn).not.toHaveBeenCalled()
  })

  /* stopDrag */

  it('stopDrag: should callback function and reset values', async () => {
    const { dummyFn, event } = common()
    wrapper.vm.startDrag(event, true, dummyFn)
    event.touches[0].clientX = 25
    wrapper.vm.doDrag(event, 100, dummyFn)
    wrapper.vm.stopDrag(event, dummyFn)
    expect(wrapper.vm.delta).toEqual(0)
    expect(wrapper.vm.dragOn).toBeFalse()
    expect(wrapper.vm.direction).toEqual('none')
    expect(dummyFn).toHaveBeenCalledWith(event)
  })

  it('stopDrag: should not callback function', async () => {
    const { dummyFn, event } = common()
    wrapper.vm.stopDrag(event, dummyFn)
    expect(dummyFn).not.toHaveBeenCalled()
  })
})
