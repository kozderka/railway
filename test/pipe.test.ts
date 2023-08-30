import { expect, test } from 'vitest'
import { pipe } from '../src/pipe'
import { success, failure, chain } from '../src/result'
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
  const result = pipe('')

  expect(result).toEqual(success(''))
})

test('Call async / sync functions with failure in async function', async () => {
  const result = pipe(
    0,
    chain(add1),
    chain(add2Async),
    chain(addFailAsync),
    chain(add3Async),
    chain(add1),
  )

  await expect(result).resolves.toEqual(failure('failure'))
})

test('Call async / sync functions with failure', async () => {
  const result = pipe(
    0,
    chain(add1),
    chain(add2Async),
    chain(addFail),
    chain(add3Async),
    chain(add1),
  )

  await expect(result).resolves.toEqual(failure('failure'))
})

test('Call async / sync functions with success result', async () => {
  const result = pipe(
    0,
    chain(add1),
    chain(add2Async),
    chain(add3Async),
    chain(add1),
  )

  await expect(result).resolves.toEqual(success(7))
})

test('Call async functions with success result', async () => {
  const result = pipe(0, chain(add1Async), chain(add2Async), chain(add3Async))

  await expect(result).resolves.toEqual(success(6))
})

test('Call async functions in correct order', () => {
  const result = pipe('', chain(add1Async), chain(add2Async), chain(add3Async))

  expect(result).resolves.toEqual(success('123'))
})

test('Call functions with success result', () => {
  const result = pipe(0, chain(add1), chain(add2), chain(add3))

  expect(result).toEqual(success(6))
})

test('Call functions in correct order', () => {
  const result = pipe('', chain(append1), chain(append2), chain(append3))

  expect(result).toEqual(success('123'))
})

test('Call functions with failure', () => {
  const result = pipe(0, add1, add2, add3, addFail)

  expect(result).toEqual(failure('failure'))
})
