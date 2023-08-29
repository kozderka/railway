/* eslint-disable @typescript-eslint/no-explicit-any */
import { reduceLeft } from './pipe'
import { Result, success } from './result'

export function compose<V, S, E>(
  ...fns: ((arg: any) => Result<any, any> | Promise<Result<any, any>>)[]
): (x: V) => Result<S, E> | Promise<Result<S, E>> {
  const reversedFns = [...fns].reverse()

    return (x: V): Result<S, E> | Promise<Result<S, E>> => reversedFns.length === 0
      ? success(x)
      : reduceLeft(success(x), reversedFns[0], reversedFns.slice(1))
}
