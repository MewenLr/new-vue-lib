import HttpClient, { HttpClientSymbol } from './HttpClient'
import CommentService, { CommentServiceSymbol } from './Comment/CommentService'

export default {
  [HttpClientSymbol]: HttpClient,
  [CommentServiceSymbol]: new CommentService(HttpClient),
}
