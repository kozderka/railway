/* eslint-disable @typescript-eslint/ban-types */
import { reduceLeft } from './pipe'

export function compose<A>(): (x: A) => A
export function compose<A, B>(f1: (arg: A) => B): (x: A) => B
export function compose<A, B, C>(
  f1: (arg: B) => C,
  f2: (arg: A) => B,
): (x: A) => C
export function compose<A, B, C, D>(
  f1: (arg: C) => D,
  f2: (arg: B) => C,
  f3: (arg: A) => B,
): (x: A) => D
export function compose<A, B, C, D, E>(
  f1: (arg: D) => E,
  f2: (arg: C) => D,
  f3: (arg: B) => C,
  f4: (arg: A) => B,
): (x: A) => E
export function compose<A, B, C, D, E, F>(
  f1: (arg: E) => F,
  f2: (arg: D) => E,
  f3: (arg: C) => D,
  f4: (arg: B) => C,
  f5: (arg: A) => B,
): (x: A) => F
export function compose<A, B, C, D, E, F, G>(
  f1: (arg: F) => G,
  f2: (arg: E) => F,
  f3: (arg: D) => E,
  f4: (arg: C) => D,
  f5: (arg: B) => C,
  f6: (arg: A) => B,
): (x: A) => G
export function compose<A, B, C, D, E, F, G, H>(
  f1: (arg: G) => H,
  f2: (arg: F) => G,
  f3: (arg: E) => F,
  f4: (arg: D) => E,
  f5: (arg: C) => D,
  f6: (arg: B) => C,
  f7: (arg: A) => B,
): (x: A) => H
export function compose<A, B, C, D, E, F, G, H, I>(
  f1: (arg: H) => I,
  f2: (arg: G) => H,
  f3: (arg: F) => G,
  f4: (arg: E) => F,
  f5: (arg: D) => E,
  f6: (arg: C) => D,
  f7: (arg: B) => C,
  f8: (arg: A) => B,
): (x: A) => I
export function compose<A, B, C, D, E, F, G, H, I, J>(
  f1: (arg: I) => J,
  f2: (arg: H) => I,
  f3: (arg: G) => H,
  f4: (arg: F) => G,
  f5: (arg: E) => F,
  f6: (arg: D) => E,
  f7: (arg: C) => D,
  f8: (arg: B) => C,
  f9: (arg: A) => B,
): (x: A) => J
export function compose<A, B, C, D, E, F, G, H, I, J, K>(
  f1: (arg: J) => K,
  f2: (arg: I) => J,
  f3: (arg: H) => I,
  f4: (arg: G) => H,
  f5: (arg: F) => G,
  f6: (arg: E) => F,
  f7: (arg: D) => E,
  f8: (arg: C) => D,
  f9: (arg: B) => C,
  f10: (arg: A) => B,
): (x: A) => K
export function compose(...fns: Array<Function>): (x: unknown) => unknown {
  const reversedFns = [...fns].reverse()

  return (x: unknown): unknown => {
    return reduceLeft(x, reversedFns)
  }
}
