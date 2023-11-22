import { describe, test } from 'node:test'
import assert from 'node:assert'
import { pipe } from '../src/pipe.js'
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
  append1Async,
  append2,
  append2Async,
  append3,
  append3Async
} from './helpers.js'
import { chain, failure, success, map } from '../src/result.js'

describe('pipe', () => {
  test('Call with empty argumets', () => {
    const result = pipe('')

    assert.deepStrictEqual(result, '')
  })

  test('Call async / sync functions with failure in async function', async () => {
    const result = await pipe(
      0,
      add1,
      chain(add2Async),
      chain(addFailAsync),
      chain(add3Async),
      chain(add1)
    )

    assert.deepStrictEqual(result, failure('failure'))
  })

  test('Call async / sync functions with failure', async () => {
    const result = await pipe(
      0,
      add1,
      chain(add2Async),
      chain(addFail),
      chain(add3Async),
      chain(add1)
    )

    assert.deepStrictEqual(result, failure('failure'))
  })

  test('Call async / sync functions with success result', async () => {
    const result = await pipe(
      0,
      add1,
      chain(add2Async),
      chain(add3Async),
      chain(add1)
    )

    assert.deepStrictEqual(result, success(7))
  })

  test('Call async functions with success result', async () => {
    const result = await pipe(0, add1Async, chain(add2Async), chain(add3Async))

    assert.deepStrictEqual(result, success(6))
  })

  test('Call async functions in correct order', async () => {
    const result = await pipe(
      '',
      append1Async,
      chain(append2Async),
      chain(append3Async)
    )

    assert.deepStrictEqual(result, success('123'))
  })

  test('Call functions with success result', () => {
    const result = pipe(0, add1, chain(add2), chain(add3))

    assert.deepStrictEqual(result, success(6))
  })

  test('Call functions in correct order', () => {
    const result = pipe('', append1, chain(append2), chain(append3))

    assert.deepStrictEqual(result, success('123'))
  })

  test('Call functions with failure', () => {
    const result = pipe(0, add1, chain(add2), chain(add3), chain(addFail))

    assert.deepStrictEqual(result, failure('failure'))
  })

  test('Call clasic functions', () => {
    const result = pipe(
      0,
      add1WithoutRailwayResult,
      add2WithoutRailwayResult,
      add3WithoutRailwayResult
    )

    assert.deepStrictEqual(result, 6)
  })

  test('Mix clasic and railway functions', () => {
    const result = pipe(
      0,
      add1WithoutRailwayResult,
      add2,
      chain(map(add3WithoutRailwayResult, 'failure'))
    )

    assert.deepStrictEqual(result, success(6))
  })
})
