const SUCCESS = 'success'
const FAILURE = 'failure'

export interface Success<S> {
  readonly tag: 'success'
  readonly value: S
}

export interface Failure<E> {
  readonly tag: 'failure'
  readonly error: E
}

export type Result<S, E> = Success<S> | Failure<E>

export function success<S>(value: S): Success<S> {
  return { tag: SUCCESS, value }
}

export function failure<E>(error: E): Failure<E> {
  return { tag: FAILURE, error }
}

export function isSuccess<S, E>(result: Result<S, E>): boolean {
  return result.tag === SUCCESS
}

export function isFailure<S, E>(result: Result<S, E>): boolean {
  return result.tag === FAILURE
}

export function getValue<S, E>(result: Result<S, E>): S {
  if (isSuccess(result)) {
    return (result as Success<S>).value
  } else {
    throw new Error('Cannot get value of failure result')
  }
}

export function chain<T, S, E>(f: (a: T) => Result<S, E> | Promise<Result<S, E>>) {
  return <F>(result: Result<T, F>): Result<S, E> | Result<T, F> | Promise<Result<S, E>> | Promise<Result<T, F>> => {
    if (isSuccess(result)) {
      return f(getValue(result))
    } else {
      return result
    }
  }
}

export function tee<T, E>(f: (a: unknown) => void) {
  return (result: Result<T, E>): Result<T, E> => {
    if (isSuccess(result)) {
      f(getValue(result))
    }

    return result
  }
}