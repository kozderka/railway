import { expect, test } from 'vitest'
import { compose } from '../src/compose'
import { success, failure, chain, toResult } from '../src/result'
import {
  add1,
  add1Async,
  add1WithoutRailwayResult,
  add2,
  add2Async,
  add2WithoutRailwayResult,
  add3,
  add3Async,
  add3WithoutRailwayResult,
  addFail,
  append1,
  append1Async,
  append2,
  append2Async,
  append3,
  append3Async,
} from './helpers'

test('Call with empty argumets', () => {
  const result = compose()('')

  expect(result).toEqual('')
})

test('Call async / sync functions with failure', async () => {
  const result = compose(
    chain(add1),
    chain(add2Async),
    chain(addFail),
    chain(add3Async),
    add1,
  )(0)

  await expect(result).resolves.toEqual(failure('failure'))
})

test('Call async / sync functions with success result', async () => {
  const result = compose(
    chain(add1),
    chain(add2Async),
    chain(add3Async),
    add1,
  )(0)

  await expect(result).resolves.toEqual(success(7))
})

test('Call async functions with success result', async () => {
  const result = compose(chain(add1Async), chain(add2Async), add3Async)(0)

  await expect(result).resolves.toEqual(success(6))
})

test('Call async functions in correct order', () => {
  const result = compose(chain(append1Async), chain(append2Async), append3Async)('')

  expect(result).resolves.toEqual(success('321'))
})

test('Call functions with success result', () => {
  const result = compose(chain(add1), chain(add2), add3)(0)

  expect(result).toEqual(success(6))
})

test('Call functions in correct order', () => {
  const result = compose(chain(append1), chain(append2), append3)('')

  expect(result).toEqual(success('321'))
})

test('Call functions with failure', () => {
  const result = compose(chain(add1), chain(add2), chain(add3), addFail)(0)

  expect(result).toEqual(failure('failure'))
})

test('Call clasic functions', () => {
  const result = compose(
    add1WithoutRailwayResult,
    add2WithoutRailwayResult,
    add3WithoutRailwayResult,
  )(0)

  expect(result).toEqual(6)
})

test('Mix clasic and railway functions', () => {
  const result = compose(
    chain(toResult(add1WithoutRailwayResult, 'failure')),
    add2,
    add3WithoutRailwayResult,
  )(0)

  expect(result).toEqual(success(6))
})
