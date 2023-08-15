/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipeFunction } from './pipe'
import { Result, success } from './result'

export default function <S, T>(
  ...fns: ((arg: any) => Result<any> | Promise<Result<any>>)[]
): (x: S) => Result<T> | Promise<Result<T>> {
  const reversedFns = [...fns].reverse()

  return (x: S): Result<T> | Promise<Result<T>> => {
    return reversedFns.length === 0
      ? success(x)
      : pipeFunction(x, reversedFns[0], reversedFns.slice(1))
  }
}
