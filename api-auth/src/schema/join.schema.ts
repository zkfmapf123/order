import Joi from 'joi'

export interface JoinParams {
  email: string
  password: string
  name: string
  address: string
}

export const JoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
})
