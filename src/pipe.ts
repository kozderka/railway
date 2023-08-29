/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result, success } from './result'

export function pipe <V, T, E>(
  x: V,
  ...fns: ((arg: any) => Result<any, any> | Promise<Result<any, any>>)[]
): Result<T, E> | Promise<Result<T, E>> {
    return fns.length === 0 ? success(x) : reduceLeft(success(x), fns[0], fns.slice(1))
}

export function reduceLeft(
  value: any,
  fn: (arg: any) => Result<any, any> | Promise<Result<any, any>>,
  fns: ((arg: any) => Result<any, any> | Promise<Result<any, any>>)[],
): Result<any, any> | Promise<Result<any, any>> {
  const result = fn(value)

  if (result instanceof Promise) {
    return result.then(
      (r: Result<any, any>): Result<any, any> | Promise<Result<any, any>> => {
          return fns.length === 0
            ? r
            : reduceLeft(r, fns[0], fns.slice(1))
      },
    )
  } else {
      return fns.length === 0
        ? result
        : reduceLeft(result, fns[0], fns.slice(1))
  }
}
