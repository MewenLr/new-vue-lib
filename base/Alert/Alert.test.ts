// import { VueWrapper } from '@vue/test-utils'
// import { prepare } from '@/config/jest/utils/prepare'
// import cloneDeep from 'lodash/cloneDeep'
// import Alert from './Alert.vue'
// import dataset from './Alert.dataset'

// const { props, slots } = dataset

// let propsData: any
// let wrapper: VueWrapper<any>

// describe('[Alert]', () => {

//   beforeEach(async () => {
//     propsData = cloneDeep(props)
//     wrapper = prepare(Alert, { propsData, slots })
//   })

//   afterEach(() => {
//     wrapper.unmount()
//   })

//   describe('Rendering', () => {

//     it('should render component with class alert--variant', async () => {
//       expect(wrapper.find('[data-alert]').classes()).toContain(`alert--${props.variant}`)
//     })

//     it('should render component with class alert--has-icon', async () => {
//       expect(wrapper.find('[data-alert]').classes()).toContain('alert--has-icon')
//     })

//     it('should render component with class alert--position', async () => {
//       const position = 'top-right'
//       propsData.position = position
//       wrapper = prepare(Alert, { propsData, slots })
//       await wrapper.vm.$nextTick()
//       expect(wrapper.find('[data-alert]').classes()).toContain(`alert--${position}`)
//     })

//     it('should render data-icon', async () => {
//       expect(wrapper.find('[data-icon]').exists()).toBeTruthy()
//     })

//     it('should render data-close', async () => {
//       expect(wrapper.find('[data-close]').exists()).toBeTruthy()
//     })

//     it('should return console error if no default slot', async () => {
//       console.error = jest.fn()
//       wrapper = prepare(Alert, { propsData })
//       expect(console.error).toHaveBeenCalled()
//     })

//     it('should return console error if no delay and not closable', async () => {
//       console.error = jest.fn()
//       propsData.delay = 0
//       propsData.closable = false
//       wrapper = prepare(Alert, { propsData, slots })
//       expect(console.error).toHaveBeenCalled()
//     })
//   })

//   describe('Lifecycle', () => {

//     it('onMounted: should be second in local stack (after main wrapper)', async () => {
//       wrapper = prepare(Alert, { propsData, slots })
//       await wrapper.vm.$nextTick()
//       expect(wrapper.vm.idxInStack).toEqual(1)
//     })

//     it('onMounted: should be first in global stack', async () => {
//       propsData.position = 'top-right'
//       wrapper = prepare(Alert, { propsData, slots })
//       await wrapper.vm.$nextTick()
//       expect(wrapper.vm.idxInStack).toEqual(0)
//     })
//   })

//   describe('Actions', () => {

//     it('should emit close on click data-cta', async () => {
//       wrapper.find('[data-close]').trigger('click')
//       const event = wrapper.emitted('close') as any
//       expect(event[0][0] instanceof Event).toBeTrue()
//     })

//     it('should emit close on render two following components', async () => {
//       prepare(Alert, { propsData, slots })
//       await wrapper.vm.$nextTick()
//       prepare(Alert, { propsData, slots })
//       await wrapper.vm.$nextTick()
//       expect(wrapper.emitted('close')).toBeTruthy()
//     })

//     it('should emit close on render component after delay', async () => {
//       jest.useFakeTimers()
//       const delay = 3000
//       propsData.delay = delay
//       wrapper = prepare(Alert, { propsData, slots })
//       await wrapper.vm.$nextTick()
//       jest.advanceTimersByTime(delay)
//       expect(wrapper.emitted('close')).toBeTruthy()
//     })

//     // it('should emit close on unmount component', async () => {
//     //   const persistentWrapper = wrapper
//     //   wrapper.unmount()
//     //   await wrapper.vm.$nextTick()
//     //   expect(persistentWrapper.emitted('close')).toBeTruthy()
//     // })
//   })
// })
