import { reduceLeft } from './pipe.js'

/**
 *
 * @param  {function[]} fns
 * @returns function
 */
export function flow (...fns) {
  return (x) => {
    return reduceLeft(x, fns)
  }
}
