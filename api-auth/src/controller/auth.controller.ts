import { Request, Response } from 'express'
import { IController, RouterParams } from 'base/core/util'
import { Router } from 'express'
import { Controller, NeedRequest, Validation } from 'base/core/decorators'
import { LoginSchema } from '../schema/login.schema'
import { JoiSchema } from '../schema/join.schema'
import { handleJoin, handleLogin } from '../login.handler'

const AuthParams: RouterParams = {
  LOGIN: ['POST', '/login'],
  JOIN: ['POST', '/join'],
}

@Controller(AuthParams)
class AuthController implements IController {
  initRoutes(): Router {
    const r = Router()
    r.post(AuthParams.LOGIN[1], this.login)
    r.post(AuthParams.JOIN[1], this.join)
    return r
  }

  @Validation(LoginSchema)
  async login(req: Request, res: Response) {
    const _req = req as unknown as NeedRequest
    res.status(200).json(await handleLogin(_req.body))
  }

  @Validation(JoiSchema)
  async join(req: Request, res: Response) {
    const _req = req as unknown as NeedRequest
    res.status(200).json(await handleJoin(_req.body))
  }
}

export const authController = new AuthController()
