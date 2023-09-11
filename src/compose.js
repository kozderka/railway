import { reduceLeft } from './pipe.js'

/**
 *
 * @param  {function[]} fns
 * @returns function
 */
export function compose (...fns) {
  const reversedFns = [...fns].reverse()

  return (x) => {
    return reduceLeft(x, reversedFns)
  }
}
