/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result, success, isFailure, getValue } from './result'

export default function <S, T>(
  ...fns: ((arg: any) => Result<any> | Promise<Result<any>>)[]
): (x: S) => Result<T> | Promise<Result<T>> {
  return (x: S): Result<T> | Promise<Result<T>> => {
    return fns.length === 0 ? success(x) : pipeFunction(x, fns[0], fns.slice(1))
  }
}

export function pipeFunction(
  value: any,
  fn: (arg: any) => Result<any> | Promise<Result<any>>,
  fns: ((arg: any) => Result<any> | Promise<Result<any>>)[],
): Result<any> | Promise<Result<any>> {
  const result = fn(value)

  if (result instanceof Promise) {
    return result.then((r: Result<any>): Result<any> | Promise<Result<any>> => {
      if (isFailure(r)) {
        return r
      } else {
        return fns.length === 0
          ? r
          : pipeFunction(getValue(r), fns[0], fns.slice(1))
      }
    })
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
