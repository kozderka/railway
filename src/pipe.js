/**
 *
 * @param {*} x
 * @param  {Array.<function(*):*>} fns
 * @returns {*}
 */
export function pipe (x, ...fns) {
  return reduce(x, fns)
}

/**
 *
 * @param {*} value
 * @param {Array.<function(*):*>} fns
 * @returns {*}
 */
export function reduce (value, fns) {
  if (fns.length === 0) {
    return value
  }

  const [fn, ...remainingFns] = fns

  const result = fn(value)

  if (result instanceof Promise) {
    return result.then((r) => {
      return reduce(r, remainingFns)
    })
  } else {
    return reduce(result, remainingFns)
  }
}
