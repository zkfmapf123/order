import * as redis from 'redis'
import mysql from 'mysql2/promise'
import { configManager } from './config'
import _ from 'lodash'
import { Logger } from './logger'
import { failed, passed, Try } from './Try'
import { QueryProfiler } from './profiler'

interface QueryParams {
  query: string
  dbParams?: any[]
}

// use prisma
class Mysql {
  private connect(): mysql.Pool {
    return mysql.createPool({
      host: configManager.getDBConfig().host,
      user: configManager.getDBConfig().user,
      password: configManager.getDBConfig().password,
      database: configManager.getDBConfig().database,
      connectTimeout: 5000,
      connectionLimit: 30,
      waitForConnections: true,
    })
  }

  /**
   * @desc
   * 기본 쿼리 실행
   */
  async execute({ query, dbParams }: QueryParams): Promise<Try<unknown, any[]>> {
    const profiler = new QueryProfiler()
    let co
    try {
      profiler.start()
      co = await this.connect().getConnection()
      const [result] = await co.query(query, dbParams ?? null)
      return passed(result)
    } catch (e) {
      Logger.error(e)
      return failed(e)
    } finally {
      profiler.end()
      co?.release()
    }
  }

  /**
   * @desc
   * 트랜잭션 쿼리
   */
  async txExecute(params: QueryParams[]) {
    let co
    try {
      co = await this.connect().getConnection()
      await co.beginTransaction()

      for (const { query, dbParams } of params) {
        const profiler = new QueryProfiler()
        profiler.start()
        await co.query(query, dbParams)
        profiler.end()
      }

      await co.commit()
      return passed(true)
    } catch (e) {
      Logger.error(e)
      return failed(e)
    } finally {
      co?.release()
    }
  }
}

class Redis {
  connect() {
    return redis.createClient({ legacyMode: true })
  }

  async getData(key: string) {
    try {
      const client = this.connect()
      await client.connect()
      const result = await client.v4.get(key)
      return passed(result)
    } catch (e) {
      Logger.error(e)
      return failed(e)
    }
  }

  async delData(key: string) {
    try {
      const client = this.connect()
      await client.connect()
      const result = await client.del(key)
      return passed(result)
    } catch (e) {
      Logger.error(e)
      return failed(e)
    }
  }

  async setData<T>(key: string, value: T) {
    try {
      const client = this.connect()
      await client.connect()
      const result = await client.set(key, JSON.stringify(value))
      return passed(result)
    } catch (e) {
      Logger.error(e)
      return failed(e)
    }
  }
}

export const mysqlManager = new Mysql()
export const redisManger = new Redis()
