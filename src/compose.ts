/* eslint-disable @typescript-eslint/no-explicit-any */
import { reduceLeft } from './pipe'
import { Result, success } from './result'

export function compose<V, S, E>(
  ...fns: ((arg: any) => any | Result<any, any> | Promise<Result<any, any>>)[]
): (x: V) => Result<V, E> | Result<S, E> | Promise<Result<S, E>> {
  const reversedFns = [...fns].reverse()

  return (x: V): Result<V, E> | Result<S, E> | Promise<Result<S, E>> => {
    if (fns.length === 0) {
      return success(x)
    }

    return reduceLeft(x, reversedFns)
  }
}
