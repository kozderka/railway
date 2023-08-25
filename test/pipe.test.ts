import { expect, test } from 'vitest'
import pipe from '../src/pipe'
import { success, Result, failure } from '../src/result'
import {
  add1,
  add1Async,
  add2,
  add2Async,
  add3,
  add3Async,
  addFail,
  addFailAsync,
  append1,
  append2,
  append3,
} from './helpers'

test('Call with empty argumets', () => {
  const result = pipe()('')

  expect(result).toEqual(success(''))
})

test('Call async / sync functions with failure in async function', async () => {
  const result = pipe(add1, add2Async, addFailAsync, add3Async, add1)(0)

  await expect(result).resolves.toEqual(failure('failure'))
})

test('Call async / sync functions with failure', async () => {
  const result = pipe(add1, add2Async, addFail, add3Async, add1)(0)

  await expect(result).resolves.toEqual(failure('failure'))
})

test('Call async / sync functions with success result', async () => {
  const result = pipe(add1, add2Async, add3Async, add1)(0)

  await expect(result).resolves.toEqual(success(7))
})

test('Call async functions with success result', async () => {
  const result = pipe(add1Async, add2Async, add3Async)(0)

  await expect(result).resolves.toEqual(success(6))
})

test('Call async functions in correct order', () => {
  const result = pipe(add1Async, add2Async, add3Async)('')

  expect(result).resolves.toEqual(success('123'))
})

test('Call functions with success result', () => {
  const result = pipe(add1, add2, add3)(0)

  expect(result).toEqual(success(6))
})

test('Call functions in correct order', () => {
  const result = pipe(append1, append2, append3)('')

  expect(result).toEqual(success('123'))
})

test('Call functions with failure', () => {
  const result = pipe<number, number, 'failure'>(add1, add2, add3, addFail)(0)

  expect(result).toEqual(failure('failure'))
})
