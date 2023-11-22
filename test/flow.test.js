import { describe, test } from 'node:test'
import assert from 'node:assert'
import { flow } from '../src/flow.js'
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
  append3Async
} from './helpers.js'
import { chain, failure, success, map } from '../src/result.js'

describe('flow', () => {
  test('Call with empty argumets', () => {
    const result = flow()('')

    assert.deepStrictEqual(result, '')
  })

  test('Call async / sync functions with failure', async () => {
    const result = await flow(
      add1,
      chain(add2Async),
      chain(addFail),
      chain(add3Async),
      chain(add1)
    )(0)

    assert.deepStrictEqual(result, failure('failure'))
  })

  test('Call async / sync functions with success result', async () => {
    const result = await flow(
      add1,
      chain(add2Async),
      chain(add3Async),
      chain(add1)
    )(0)

    assert.deepStrictEqual(result, success(7))
  })

  test('Call async functions with success result', async () => {
    const result = await flow(add1Async, chain(add2Async), chain(add3Async))(0)

    assert.deepStrictEqual(result, success(6))
  })

  test('Call async functions in correct order', async () => {
    const result = await flow(
      append1Async,
      chain(append2Async),
      chain(append3Async)
    )('')

    assert.deepStrictEqual(result, success('123'))
  })

  test('Call functions with success result', () => {
    const result = flow(add1, chain(add2), chain(add3))(0)

    assert.deepStrictEqual(result, success(6))
  })

  test('Call functions in correct order', () => {
    const result = flow(append1, chain(append2), chain(append3))('')

    assert.deepStrictEqual(result, success('123'))
  })

  test('Call functions with failure', () => {
    const result = flow(add1, chain(add2), chain(add3), chain(addFail))(0)

    assert.deepStrictEqual(result, failure('failure'))
  })

  test('Call clasic functions', () => {
    const result = flow(
      add1WithoutRailwayResult,
      add2WithoutRailwayResult,
      add3WithoutRailwayResult
    )(0)

    assert.deepStrictEqual(result, 6)
  })

  test('Mix clasic and railway functions', () => {
    const result = flow(
      add1WithoutRailwayResult,
      add2,
      chain(map(add3WithoutRailwayResult, 'failure'))
    )(0)

    assert.deepStrictEqual(result, success(6))
  })
})
