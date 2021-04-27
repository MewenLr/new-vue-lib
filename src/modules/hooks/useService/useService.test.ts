import { VueWrapper } from '@vue/test-utils'
import { prepareShallow } from '@/config/jest/prepare'
import cloneDeep from 'lodash/cloneDeep'
import flushPromises from 'flush-promises'
import MockCommentService from '@/services/Comment/CommentService.mock'
import useService from './useService'

const props = {}

let propsData: any
let wrapper: VueWrapper<any>

const dummyComponent = {
  setup() {
    const { error, success, loading, fetchApi } = useService()
    return { error, success, loading, fetchApi }
  },
  template: '<div />',
}

describe('[useService]', () => {

  beforeEach(() => {
    propsData = cloneDeep(props)
    wrapper = prepareShallow(dummyComponent, { propsData })
  })

  afterEach(() => wrapper.unmount())

  it('fetchApi: should return a rejected promise on api error', async () => {
    const rejError = 'Dummy rejection error'
    MockCommentService.getComments.mockRejectedValue(rejError)
    expect(wrapper.vm.fetchApi(MockCommentService.getComments())).rejects.toEqual(rejError)
    await flushPromises()
    expect(wrapper.vm.error).toBeTrue()
  })

  it('fetchApi: should return a resolved promise', async () => {
    const resComments = [
      {
        id: 1,
        postId: 1,
        body: 'Dummy body',
        name: 'Dummy name',
        email: 'dummy@gmail.com',
      },
    ]
    MockCommentService.getComments.mockResolvedValue(resComments)
    expect(wrapper.vm.fetchApi(MockCommentService.getComments())).resolves.toMatchObject(resComments)
    await flushPromises()
    expect(wrapper.vm.success).toBeTrue()
  })

  it('fetchApi: should return toggle loading during api call', async () => {
    const res = 'Dummy'
    MockCommentService.getComments.mockResolvedValue(res)
    expect(wrapper.vm.fetchApi(MockCommentService.getComments())).resolves.toEqual(res)
    expect(wrapper.vm.loading).toBeTrue()
    await flushPromises()
    expect(wrapper.vm.loading).toBeFalse()
  })
})
