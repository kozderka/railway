export interface Success<S> {
  readonly success: true
  readonly value: S
}

export interface Failure<E> {
  readonly success: false
  readonly error: E
}

export type Result<S, E> = Success<S> | Failure<E>

export function success<S>(value: S): Success<S> {
  return { success: true, value }
}

export function failure<E>(error: E): Failure<E> {
  return { success: false, error }
}

export function isSuccess<S, E>(result: Result<S, E>): boolean {
  return result.success === true
}

export function isFailure<S, E>(result: Result<S, E>): boolean {
  return result.success === false
}

export function getValue<S, E>(result: Result<S, E>): S {
  if (isSuccess(result)) {
    return (result as Success<S>).value
  } else {
    throw new Error('Cannot get value of failure result')
  }
}
