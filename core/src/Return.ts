export enum SucessStatus {
  SUCCESS = 200,
  SUCCESS_BUT_NOT_PROCESS = 202,
  SUCCESS_NO_CONTENT = 204,
}

export enum FailStatus {
  ERR_BAD_REQUEST = 400,
  ERR_NOT_AUTHENTICATION = 401,
  ERR_INTERNAL = 500,
}

export type ResponseErrType<E> = {
  _tag: 'error'
  status: number
  error: E
}

export type ResponseSuccessType<T> = {
  _tag: 'success'
  status: number
  result: T
}

export type ResponseType<E, T> = ResponseErrType<E> | ResponseSuccessType<T>

export const successed = <T>(status: SucessStatus, result: T): ResponseSuccessType<T> => ({
  _tag: 'success',
  status,
  result,
})

export const errored = <E>(status: FailStatus, error: E): ResponseErrType<E> => ({
  _tag: 'error',
  status,
  error,
})

export const isSuccessed = <T>(success: ResponseSuccessType<T>) => success._tag === 'success'
export const isErrored = <E>(error: ResponseErrType<E>) => error._tag === 'error'
