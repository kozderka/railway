/* eslint-disable @typescript-eslint/no-explicit-any */
import { reduceLeft } from './pipe'

export function flow<A, B>(
  ...fns: ((arg: any) => any | Promise<any>)[]
): (x: A) => A | B | Promise<B> {
  return (x: A): B | Promise<B> => {
    return reduceLeft(x, fns)
  }
}