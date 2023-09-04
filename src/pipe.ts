/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function pipe<A>(x: A): A
export function pipe<A, B>(x: A, f1: (arg: A) => B): B
export function pipe<A, B, C>(
  x: A,
  f1: (arg: A) => B,
  f2: (arg: B) => C,
): C
export function pipe<A, B, C, D>(
  x: A,
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
): D
export function pipe<A, B, C, D, E>(
  x: A,
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
): E
export function pipe<A, B, C, D, E, F>(
  x: A,
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
): F
export function pipe<A, B, C, D, E, F, G>(
  x: A,
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
  f6: (arg: F) => G,
): G
export function pipe<A, B, C, D, E, F, G, H>(
  x: A,
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
  f6: (arg: F) => G,
  f7: (arg: G) => H,
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  x: A,
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
  f6: (arg: F) => G,
  f7: (arg: G) => H,
  f8: (arg: H) => I,
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  x: A,
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
  f6: (arg: F) => G,
  f7: (arg: G) => H,
  f8: (arg: H) => I,
  f9: (arg: I) => J,
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  x: A,
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
  f6: (arg: F) => G,
  f7: (arg: G) => H,
  f8: (arg: H) => I,
  f9: (arg: I) => J,
  f10: (arg: J) => K,
): K
export function pipe(
  x: unknown,
  ...fns: Array<Function>
): unknown {
  return reduceLeft(x, fns)
}

export function reduceLeft(
  value: unknown,
  fns: Array<Function>,
): unknown {
  if (fns.length === 0) {
    return value
  }

  const [fn, ...remainingFns] = fns

  const result = fn(value)

  if (result instanceof Promise) {
    return result.then(
      (r: unknown): unknown => {
        return reduceLeft(r, remainingFns)
      },
    )
  } else {
    return reduceLeft(result, remainingFns)
  }
}
