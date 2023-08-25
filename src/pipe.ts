/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result, success, isFailure, getValue } from './result'

export default function <V, S, E>(
  ...fns: ((arg: any) => Result<any, any> | Promise<Result<any, any>>)[]
): (x: V) => Result<S, E> | Promise<Result<S, E>> {
  return (x: V): Result<S, E> | Promise<Result<S, E>> => {
    return fns.length === 0 ? success(x) : pipeFunction(x, fns[0], fns.slice(1))
  }
}

export function pipeFunction(
  value: any,
  fn: (arg: any) => Result<any, any> | Promise<Result<any, any>>,
  fns: ((arg: any) => Result<any, any> | Promise<Result<any, any>>)[],
): Result<any, any> | Promise<Result<any, any>> {
  const result = fn(value)

  if (result instanceof Promise) {
    return result.then(
      (r: Result<any, any>): Result<any, any> | Promise<Result<any, any>> => {
        if (isFailure(r)) {
          return r
        } else {
          return fns.length === 0
            ? r
            : pipeFunction(getValue(r), fns[0], fns.slice(1))
        }
      },
    )
  } else {
    if (isFailure(result)) {
      return result
    } else {
      return fns.length === 0
        ? result
        : pipeFunction(getValue(result), fns[0], fns.slice(1))
    }
  }
}
