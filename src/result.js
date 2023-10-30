const SUCCESS = 'success'
const FAILURE = 'failure'

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
  return { tag: SUCCESS, value }
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
 *
 * @param {Result} result
 * @returns {*}
 */
export function getValue (result) {
  if (isSuccess(result)) {
    return result.value
  } else {
    throw new Error('Cannot get value of failure result')
  }
}

/**
 *
 * @param {function(*):*} fn
 * @param {*} error
 * @returns {unction(*):*}
 */
export function toResult (fn, error) {
  return (a) => {
    try {
      return success(fn(a))
    } catch (e) {
      return failure(error)
    }
  }
}

/**
 *
 * @param {function(*):*} f
 * @returns {function(*):*}
 */
export function chain (f) {
  return (result) => {
    if (result instanceof Promise) {
      return result.then(chain(f))
    } else if (isSuccess(result)) {
      return f(getValue(result))
    } else {
      return result
    }
  }
}

/**
 *
 * @param {function(*):*} f
 * @returns {function(*):*}
 */
export function tee (f) {
  return (result) => {
    if (isSuccess(result)) {
      f(getValue(result))
    }

    return result
  }
}
