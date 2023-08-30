import { expect, test } from 'vitest'
import { compose } from '../src/compose'
import { success, failure, chain } from '../src/result'
import {
  add1,
  add1Async,
  add2,
  add2Async,
  add3,
  add3Async,
  addFail,
  append1,
  append2,
  append3,
} from './helpers'

test('Call with empty argumets', () => {
  const result = compose()('')

  expect(result).toEqual(success(''))
})

test('Call async / sync functions with failure', async () => {
  const result = compose(
    chain(add1),
    chain(add2Async),
    chain(addFail),
    chain(add3Async),
    chain(add1),
  )(0)

  await expect(result).resolves.toEqual(failure('failure'))
})

test('Call async / sync functions with success result', async () => {
  const result = compose(
    chain(add1),
    chain(add2Async),
    chain(add3Async),
    chain(add1),
  )(0)

  await expect(result).resolves.toEqual(success(7))
})

test('Call async functions with success result', async () => {
  const result = compose(
    chain(add1Async),
    chain(add2Async),
    chain(add3Async),
  )(0)

  await expect(result).resolves.toEqual(success(6))
})

test('Call async functions in correct order', () => {
  const result = compose(
    chain(add1Async),
    chain(add2Async),
    chain(add3Async),
  )('')

  expect(result).resolves.toEqual(success('321'))
})

test('Call functions with success result', () => {
  const result = compose(chain(add1), chain(add2), chain(add3))(0)

  expect(result).toEqual(success(6))
})

test('Call functions in correct order', () => {
  const result = compose(chain(append1), chain(append2), chain(append3))('')

  expect(result).toEqual(success('321'))
})

test('Call functions with failure', () => {
  const result = compose(
    chain(add1),
    chain(add2),
    chain(add3),
    chain(addFail),
  )(0)

  expect(result).toEqual(failure('failure'))
})
