/**
 *
 * @param {any} x
 * @param  {function[]} fns
 * @returns {any}
 */
export function pipe(x, ...fns) {
  return reduceLeft(x, fns)
}

/**
 *
 * @param {any} value
 * @param {function[]} fns
 * @returns {any}
 */
export function reduceLeft(value, fns) {
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
