/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { reduceLeft } from './pipe'

export function compose<A>(): (x: A) => A
export function compose<A, B>(f1: (arg: A) => B): (x: A) => B
export function compose<A, B, C>(
  f1: (arg: A) => B,
  f2: (arg: B) => C,
): (x: A) => C
export function compose<A, B, C, D>(
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
): (x: A) => D
export function compose<A, B, C, D, E>(
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
): (x: A) => E
export function compose<A, B, C, D, E, F>(
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
): (x: A) => F
export function compose<A, B, C, D, E, F, G>(
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
  f6: (arg: F) => G,
): (x: A) => G
export function compose<A, B, C, D, E, F, G, H>(
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
  f6: (arg: F) => G,
  f7: (arg: G) => H,
): (x: A) => H
export function compose<A, B, C, D, E, F, G, H, I>(
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
  f6: (arg: F) => G,
  f7: (arg: G) => H,
  f8: (arg: H) => I,
): (x: A) => I
export function compose<A, B, C, D, E, F, G, H, I, J>(
  f1: (arg: A) => B,
  f2: (arg: B) => C,
  f3: (arg: C) => D,
  f4: (arg: D) => E,
  f5: (arg: E) => F,
  f6: (arg: F) => G,
  f7: (arg: G) => H,
  f8: (arg: H) => I,
  f9: (arg: I) => J,
): (x: A) => J
export function compose<A, B, C, D, E, F, G, H, I, J, K>(
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
): (x: A) => K
export function compose(
  ...fns: Array<Function>
): (x: unknown) => unknown {
  const reversedFns = [...fns].reverse()

  return (x: unknown): unknown => {
    return reduceLeft(x, reversedFns)
  }
}
