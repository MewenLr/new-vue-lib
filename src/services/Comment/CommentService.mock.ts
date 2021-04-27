import { AxiosInstance } from 'axios'
import CommentService from './CommentService'

class MockCommentService extends CommentService {

  getComments = jest.fn();

}

export default new MockCommentService({} as AxiosInstance)
