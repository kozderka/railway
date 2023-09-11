const SUCCESS = 'success'
const FAILURE = 'failure'

/**
 * @typedef {Object} Success
 * @property {'success'} tag
 * @property {any} value
 */

/**
 * @typedef {Object} Failure
 * @property {'failure'} tag
 * @property {any} error
 */

/**
 * @typedef {Success | Failure} Result
 */

/**
 *
 * @param {any} value
 * @returns Success
 */
export function success(value) {
  return { tag: SUCCESS, value }
}

/**
 *
 * @param {any} error
 * @returns Failure
 */
export function failure(error) {
  return { tag: FAILURE, error }
}

/**
 *
 * @param {Result} result
 * @returns boolean
 */
export function isSuccess(result) {
  return result.tag === SUCCESS
}

/**
 *
 * @param {Result} result
 * @returns boolean
 */
export function isFailure(result) {
  return result.tag === FAILURE
}

/**
 *
 * @param {Result} result
 * @returns any
 */
export function getValue(result) {
  if (isSuccess(result)) {
    return result.value
  } else {
    throw new Error('Cannot get value of failure result')
  }
}

/**
 *
 * @param {function} fn
 * @param {any} error
 * @returns Result
 */
export function toResult(fn, error) {
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
 * @param {function} f
 * @returns
 */
export function chain(f) {
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
 * @param {function} f
 * @returns any
 */
export function tee(f) {
  return (result) => {
    if (isSuccess(result)) {
      f(getValue(result))
    }

    return result
  }
}
