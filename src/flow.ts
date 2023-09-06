/* eslint-disable @typescript-eslint/ban-types */
import { reduceLeft } from './pipe'

export function flow(...fns: Array<Function>): (x: unknown) => unknown {
  return (x: unknown): unknown => {
    return reduceLeft(x, fns)
  }
}
