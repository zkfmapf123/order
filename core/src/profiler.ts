import { Logger } from './logger'

export class QueryProfiler {
  private lastTime

  start() {
    this.lastTime = process.hrtime()
  }

  end(query?: any) {
    const diff = process.hrtime(this.lastTime)
    console.log(`${query ? JSON.stringify(query) : ''} Timer :  ${Math.ceil(diff[1]) / 1000000000}`)
  }
}
