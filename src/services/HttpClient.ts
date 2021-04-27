import axios from 'axios'

export const HttpClientSymbol = Symbol('HttpClient symbol')

const httpClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export default httpClient
