import { describe, test } from 'node:test'
import assert from 'node:assert'
import { compose } from '../src/compose.js'
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
} from './helpers.js'
import { chain, failure, success, toResult } from '../src/result.js'

describe('compose', () => {
  test('Call with empty argumets', () => {
    const result = compose()('')

    assert.deepStrictEqual(result, '')
  })

  test('Call async / sync functions with failure', async () => {
    const result = await compose(
      chain(add1),
      chain(add2Async),
      chain(addFail),
      chain(add3Async),
      add1,
    )(0)

    assert.deepStrictEqual(result, failure('failure'))
  })

  test('Call async / sync functions with success result', async () => {
    const result = await compose(
      chain(add1),
      chain(add2Async),
      chain(add3Async),
      add1,
    )(0)

    assert.deepStrictEqual(result, success(7))
  })

  test('Call async functions with success result', async () => {
    const result = await compose(
      chain(add1Async),
      chain(add2Async),
      add3Async,
    )(0)

    assert.deepStrictEqual(result, success(6))
  })

  test('Call async functions in correct order', async () => {
    const result = await compose(
      chain(append1Async),
      chain(append2Async),
      append3Async,
    )('')

    assert.deepStrictEqual(result, success('321'))
  })

  test('Call functions with success result', () => {
    const result = compose(chain(add1), chain(add2), add3)(0)

    assert.deepStrictEqual(result, success(6))
  })

  test('Call functions in correct order', () => {
    const result = compose(chain(append1), chain(append2), append3)('')

    assert.deepStrictEqual(result, success('321'))
  })

  test('Call functions with failure', () => {
    const result = compose(chain(add1), chain(add2), chain(add3), addFail)(0)

    assert.deepStrictEqual(result, failure('failure'))
  })

  test('Call clasic functions', () => {
    const result = compose(
      add1WithoutRailwayResult,
      add2WithoutRailwayResult,
      add3WithoutRailwayResult,
    )(0)

    assert.deepStrictEqual(result, 6)
  })

  test('Mix clasic and railway functions', () => {
    const result = compose(
      chain(toResult(add1WithoutRailwayResult, 'failure')),
      add2,
      add3WithoutRailwayResult,
    )(0)

    assert.deepStrictEqual(result, success(6))
  })
})
