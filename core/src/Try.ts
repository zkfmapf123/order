export enum TryType {
  PASS = 'pass',
  FAIL = 'fail',
}

export type Pass<T> = {
  _tag: 'pass'
  result: T
  error: null
}

export type Fail<E> = {
  _tag: 'fail'
  result: null
  error: E
}

export type Try<E, T> = Pass<T> | Fail<E>

export const passed = <T>(result: T): Pass<T> => ({
  _tag: 'pass',
  result,
  error: null,
})

export const failed = <E>(error: E): Fail<E> => ({
  _tag: 'fail',
  result: null,
  error,
})

export const isPass = <T>(t: Try<unknown, T>) => t._tag === 'pass'
export const isFail = <E>(t: Try<E, unknown>) => t._tag === 'fail'
