import mysql from 'mysql2/promise'
import { orderConfig } from './config'
import _ from 'lodash'
import { Logger } from './logger'
import { failed, passed, Try } from './Try'
import { QueryProfiler } from './profiler'

type ConnectParams = {
  [t in 'host' | 'user' | 'password' | 'database']: string
}

interface QueryParams {
  query: string
  dbParams?: any[]
}

interface IDatabase {
  execute(params: QueryParams)
  txExecute(params: QueryParams[])
}

export class DatabaseManager {
  private constructor() {}

  static setting(db: 'mysql' | 'postgreSQL' | 'mongo' | 'redis') {
    switch (db) {
      case 'mysql':
        return new Mysql()
      case 'redis':
        return new Redis()
      default:
        throw new Error(`${db} not exists`)
    }
  }
}

// use prisma
class Mysql implements IDatabase {
  private connect(): mysql.Pool {
    return mysql.createPool({
      host: orderConfig.getDBConfig().host,
      user: orderConfig.getDBConfig().user,
      password: orderConfig.getDBConfig().password,
      database: orderConfig.getDBConfig().database,
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
      const result = await co.query(query, dbParams ?? null)
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

class Redis implements IDatabase {
  execute(params: QueryParams) {
    throw new Error('Method not implemented.')
  }
  txExecute(params: QueryParams[]) {
    throw new Error('Method not implemented.')
  }
  connect(params: ConnectParams) {
    throw new Error('Method not implemented.')
  }
}
