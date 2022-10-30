import Joi from 'joi'

export interface LoginParams {
  email: string
  password: string
}

export const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})
