import { Result, failure, success } from '../src/result'

export function add1(x: number): Result<number> {
  return success(x + 1)
}

export function add2(x: number): Result<number> {
  return success(x + 2)
}

export function add3(x: number): Result<number> {
  return success(x + 3)
}

export async function add1Async(x: number): Promise<Result<number>> {
  return success(x + 1)
}

export async function add2Async(x: number): Promise<Result<number>> {
  return success(x + 2)
}

export async function add3Async(x: number): Promise<Result<number>> {
  return success(x + 3)
}

export function append1(s: string): Result<string> {
  return success(s + '1')
}

export function append2(s: string): Result<string> {
  return success(s + '2')
}

export function append3(s: string): Result<string> {
  return success(s + '3')
}

export async function append1Async(s: string): Promise<Result<string>> {
  return success(s + '1')
}

export async function append2Async(s: string): Promise<Result<string>> {
  return success(s + '2')
}

export async function append3Async(s: string): Promise<Result<string>> {
  return success(s + '3')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function addFail(x: number): Result<number> {
  return failure('fail')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function addFailAsync(x: number): Promise<Result<number>> {
  return failure('fail')
}
