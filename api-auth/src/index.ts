import express from 'express'
import { ExpressManager, IController } from 'base/core/util'
import { configManager } from 'base/core/config'
import helmet from 'helmet'
import morgan from 'morgan'
import { Router } from 'express'
import { authController } from './controller/auth.controller'

const AUTH_MSG = 'EXPRESS_AUTH'
class AuthExpress extends ExpressManager {
  constructor(private readonly port: string, private readonly msg: string) {
    super()
  }

  override setting(): this {
    this.app.use(helmet())
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    return this
  }

  override middlewares(): this {
    return this
  }

  override router(controllers: IController[]): this {
    const r = Router()

    controllers.forEach((controller) => {
      r.use(controller.initRoutes())
    })

    this.app.use('/auth', r)
    return this
  }

  override start() {
    this.app.listen(this.port, () => {
      console.log(`${this.msg} -> http://localhost:${this.port}`)
    })
  }
}

const authExpress = new AuthExpress(<string>configManager.getApiPort().auth, AUTH_MSG)
authExpress.setting().middlewares().router([authController]).start()
