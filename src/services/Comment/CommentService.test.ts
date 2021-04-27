import { AxiosInstance } from 'axios'
import CommentService from './CommentService'
import MockHttpClient from '../HttpClient.mock'

let service: CommentService

describe('[CommentService]', () => {

  beforeEach(() => {
    service = new CommentService(MockHttpClient as unknown as AxiosInstance)
  })

  describe('getComments', () => {

    it('should return a rejected promise on api error', async () => {
      const rejError = 'Dummy rejection error'
      MockHttpClient.get.mockRejectedValue(rejError)
      expect(service.getComments()).rejects.toEqual(rejError)
    })

    it('should return a resolved promise with comments list', async () => {
      const resComments = {
        data: [
          {
            postId: 1,
            id: 1,
            name: 'Dummy name',
            email: 'dummy@gmail.com',
            body: 'Dummy body',
          },
        ],
      }
      MockHttpClient.get.mockResolvedValue(resComments)
      expect(service.getComments()).resolves.toMatchObject(resComments.data)
    })
  })
})
