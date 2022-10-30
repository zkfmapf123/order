import figlet from 'figlet'
import express, { Router } from 'express'
/**
 * Object
 */

export const oKeys = (data: any) => Object.keys(data)
export const oValues = (data: any) => Object.values(data)
export const oEntries = (data: any) => Object.entries(data)
export const oAssign = (data: any) => Object.assign(data)

/**
 * Express
 */
export abstract class ExpressManager {
  readonly app = express()

  setting() {
    throw new Error('must be implements')
  }

  middlewares() {
    throw new Error('must be implements')
  }

  router(controller: IController[]): this {
    throw new Error('must be implements')
  }

  start() {
    throw new Error('must be implements')
  }
}

/**
 * Controler
 * Service
 * Router
 */

export interface RouterParams {
  [x: string]: [string, string]
}

export interface IController {
  initRoutes(): Router
}
