/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result, success } from './result'

export function flow<V, T, E>(
  x: V,
  ...fns: ((arg: any) => Result<any, any> | Promise<Result<any, any>>)[]
): Result<T, E> | Promise<Result<T, E>> {
  return reduceLeft(success(x), fns)
}

export function reduceLeft(
  value: Result<any, any>,
  fns: ((arg: any) => Result<any, any> | Promise<Result<any, any>>)[],
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
