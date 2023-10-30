/**
 *
 * @param {*} x
 * @param  {Array.<function(*):*>} fns
 * @returns {*}
 */
export function pipe (x, ...fns) {
  return reduceLeft(x, fns)
}

/**
 *
 * @param {*} value
 * @param {Array.<function(*):*>} fns
 * @returns {*}
 */
export function reduceLeft (value, fns) {
  if (fns.length === 0) {
    return value
  }

  const [fn, ...remainingFns] = fns

  const result = fn(value)

  if (result instanceof Promise) {
    return result.then((r) => {
      return reduceLeft(r, remainingFns)
    })
  } else {
    return reduceLeft(result, remainingFns)
  }
}
