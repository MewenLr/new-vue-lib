import { AxiosInstance } from 'axios'
import Comment from '@/models/comment/comment.model'

export const CommentServiceSymbol = Symbol('CommentService symbol')

export default class CommentService {

  private httpClient: AxiosInstance

  constructor(HttpClient: AxiosInstance) {
    this.httpClient = HttpClient
  }

  async getComments(): Promise<Array<Comment>> {
    try {
      const { data } = await this.httpClient.get('/comments?_limit=10')
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
