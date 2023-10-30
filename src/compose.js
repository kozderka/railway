import { reduceLeft } from './pipe.js'

/**
 *
 * @param  {Array<function(*):*>} fns
 * @returns {function(*):*}
 */
export function compose (...fns) {
  const reversedFns = [...fns].reverse()

  return (x) => {
    return reduceLeft(x, reversedFns)
  }
}
