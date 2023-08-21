export interface Success<T> {
  readonly success: boolean
  readonly value: T
}

export interface Failure {
  readonly success: boolean
  readonly error: string
}

export type Result<T> = Success<T> | Failure

export function success<T>(value: T): Success<T> {
  return { success: true, value }
}

export function failure(error: string): Failure {
  return { success: false, error }
}

export function isSuccess<T>(result: Result<T>): boolean {
  return result.success === true
}

export function isFailure<T>(result: Result<T>): boolean {
  return result.success === false
}

export function getValue<T>(result: Result<T>): T {
  if (isSuccess(result)) {
    return (result as Success<T>).value
  } else {
    throw new Error('Cannot get value of failure result')
  }
}
