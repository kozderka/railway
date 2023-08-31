/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result, success } from './result'

export function pipe<V, T, E>(
  x: V,
  ...fns: ((arg: any) => any | Result<any, any> | Promise<Result<any, any>>)[]
): Result<V, E> | Result<T, E> | Promise<Result<T, E>> {
  if (fns.length === 0) {
    return success(x)
  }

  return reduceLeft(x, fns)
}

export function reduceLeft(
  value: any | Result<any, any>,
  fns: ((arg: any) => any | Result<any, any> | Promise<Result<any, any>>)[],
): Result<any, any> | Promise<Result<any, any>> {
  if (fns.length === 0) {
    return value
  }

  const [fn, ...remainingFns] = fns

  const result = fn(value)

  if (result instanceof Promise) {
    return result.then(
      (r: Result<any, any>): Result<any, any> | Promise<Result<any, any>> => {
        return reduceLeft(r, remainingFns)
      },
    )
  } else {
    return reduceLeft(result, remainingFns)
  }
}
