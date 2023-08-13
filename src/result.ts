export interface Success<T> {
  readonly success: true
  readonly value: T
}

export interface Failure {
  readonly success: false
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
