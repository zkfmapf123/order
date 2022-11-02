/**
 * StateFull
 */

type MethodParams = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'NULL'

enum HTTP_URL {
  NULL = 'NULL',
  GATEWAY = 'http://locahost:3000',
  API = 'http://localhost:3001',
}
export class HttpTestHeler {
  private method: MethodParams
  private httpUrl: string
  private requestData: {}

  constructor() {
    this.method = 'GET'
    this.httpUrl = HTTP_URL.NULL
    this.requestData = {}
  }

  isComplete() {
    if (!this.method || !this.httpUrl) throw new Error('not ready http-test')
  }

  setMethod(method: MethodParams): this {
    this.method = method
    return this
  }

  setHttpUrl(urlType: keyof typeof HTTP_URL): this {
    this.httpUrl = HTTP_URL[urlType]
    return this
  }

  setRequestData(data = {}): this {
    this.requestData = data
    return this
  }

  async execute() {
    this.isComplete()

    /**
     * @todo
     */
  }
}
