import { expect, test } from 'vitest'
import { pipe } from '../src/pipe'
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
  addFailAsync,
  append1,
  append2,
  append3,
} from './helpers'

test('Call with empty argumets', () => {
  const result = pipe('')

  expect(result).toEqual('')
})

test('Call async / sync functions with failure in async function', async () => {
  const result = pipe(
    0,
    add1,
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
    add1,
    chain(add2Async),
    chain(addFail),
    chain(add3Async),
    chain(add1),
  )

  await expect(result).resolves.toEqual(failure('failure'))
})

test('Call async / sync functions with success result', async () => {
  const result = pipe(0, add1, chain(add2Async), chain(add3Async), chain(add1))

  await expect(result).resolves.toEqual(success(7))
})

test('Call async functions with success result', async () => {
  const result = pipe(0, add1Async, chain(add2Async), chain(add3Async))

  await expect(result).resolves.toEqual(success(6))
})

test('Call async functions in correct order', () => {
  const result = pipe('', add1Async, chain(add2Async), chain(add3Async))

  expect(result).resolves.toEqual(success('123'))
})

test('Call functions with success result', () => {
  const result = pipe(0, add1, chain(add2), chain(add3))

  expect(result).toEqual(success(6))
})

test('Call functions in correct order', () => {
  const result = pipe('', append1, chain(append2), chain(append3))

  expect(result).toEqual(success('123'))
})

test('Call functions with failure', () => {
  const result = pipe(0, add1, chain(add2), chain(add3), chain(addFail))

  expect(result).toEqual(failure('failure'))
})

test('Call clasic functions', () => {
  const result = pipe(
    0,
    add1WithoutRailwayResult,
    add2WithoutRailwayResult,
    add3WithoutRailwayResult,
  )

  expect(result).toEqual(6)
})

test('Mix clasic and railway functions', () => {
  const result = pipe(
    0,
    add1WithoutRailwayResult,
    add2,
    chain(toResult(add3WithoutRailwayResult, 'failure')),
  )

  expect(result).toEqual(success(6))
})
