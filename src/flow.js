import { reduce } from './pipe.js'

/**
 *
 * @param  {Array.<function(*):*>} fns
 * @returns {function(*):*}
 */
export function flow (...fns) {
  return (x) => {
    return reduce(x, fns)
  }
}
