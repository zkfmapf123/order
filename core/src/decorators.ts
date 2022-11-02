import { Request, Response } from 'express'
import Joi from 'joi'
import { oValues, RouterParams } from './util'

export interface NeedRequest {
  query: Map<string, string>
  params: Map<string, string>
  body: any
  headers: any
}

/**
 * @desc
 * Class Decorator
 */
export function Controller(paths: RouterParams) {
  oValues(paths).forEach((item, index) => {
    const [method, url] = item as string[]
    console.log(`${method}\t${url}`)
  })

  return (target: any) => {}
}

/**
 * @desc
 * Method Decorator
 */

export function Validation(schema: Joi.ObjectSchema) {
  return function (t: Object, p: string | symbol, d: PropertyDescriptor) {
    const original = d.value

    /**
     * args[0] request
     * args[1] response
     */
    d.value = function (...args: any) {
      const [request, response] = args as [Request, Response]
      const [{ headers }, _data] = [request.body, request?.body?.data]
      const { error, value } = schema.validate(_data)

      // validation Error
      if (error) {
        const res = response
        return res.status(400).json(error)
      }

      args[0] = Object.assign(args[0], {
        body: value,
        headers,
      })

      return original.apply(this, args)
    }
  }
}
