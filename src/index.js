export const SUCCESS = 'success'
export const FAILURE = 'failure'

/**
 * @template T
 * @typedef {Object} Success
 * @property {'success'} tag
 * @property {T} value
 */

/**
 * @template T
 * @typedef {Object} Failure
 * @property {'failure'} tag
 * @property {T} error
 */

/**
 * @template T
 * @template U
 * @typedef {Success<T> | Failure<U>} Result
 */

/**
 * @template T
 * @param {T} value
 * @returns {Success<T>}
 */
export function success (value) {
  return {
    tag: SUCCESS,
    value
  }
}

/**
 * @template T
 * @param {T} error
 * @returns {Failure<T>}
 */
export function failure (error) {
  return { tag: FAILURE, error }
}

/**
 *
 * @param {Result} result
 * @returns {boolean}
 */
export function isSuccess (result) {
  return result.tag === SUCCESS
}

/**
 *
 * @param {Result} result
 * @returns {boolean}
 */
export function isFailure (result) {
  return result.tag === FAILURE
}

/**
 * @template T
 * @template U
 * @param {Result<T, U>} result
 * @returns {T}
 */
export function getValue (result) {
  if (isSuccess(result)) {
    return result.value
  } else {
    throw new Error('Cannot get value of failure result')
  }
}

/**
 * @template T
 * @param {function(*):*} f
 * @returns {function(*):Success<T>}
 */
export function map (f) {
  return (a) => {
    return success(f(a))
  }
}

/**
 *
 * @param {function(*):*} f
 * @returns {function(*):*}
 */
export function chain (f) {
  return (result) => {
    if (isSuccess(result)) {
      return f(getValue(result))
    } else {
      return result
    }
  }
}

/**
 * @template T
 * @template U
 * @param {function(*):*} f
 * @returns {function(Result<T, U>):Result<T, U>}
 */
export function tee (f) {
  return (result) => {
    if (isSuccess(result)) {
      f(getValue(result))
    }

    return result
  }
}
