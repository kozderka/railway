import { describe, test } from 'node:test'
import assert from 'node:assert'
import { FAILURE, SUCCESS, chain, failure, getValue, isFailure, isSuccess, map, success, tee } from '../src/index.js'

describe('Result creation', () => {
  test('result should be success', () => {
    const result = success('success')

    assert.strictEqual(result.tag, SUCCESS)
    assert.strictEqual(result.value, 'success')
  })
  test('result should be failure', () => {
    const result = failure('failure')

    assert.strictEqual(result.tag, FAILURE)
    assert.strictEqual(result.error, 'failure')
  })
})

describe('Helpers', () => {
  test('isSuccess should return true', () => {
    const result = success('success')

    assert.strictEqual(isSuccess(result), true)
  })
  test('isSuccess should return false', () => {
    const result = failure('success')

    assert.strictEqual(isSuccess(result), false)
  })
  test('isFailure should return true', () => {
    const result = failure('failure')

    assert.strictEqual(isFailure(result), true)
  })
  test('isFailure should return false', () => {
    const result = success('failure')

    assert.strictEqual(isFailure(result), false)
  })
  test('value should be success', () => {
    const result = success('success')

    assert.strictEqual(getValue(result), 'success')
  })
  test('result should by maped to success', () => {
    const result = map((value) => value + ' mapped')(1)

    assert.strictEqual(result.tag, SUCCESS)
    assert.strictEqual(result.value, '1 mapped')
  })
  test('chained result should be success', () => {
    const result = chain((value) => success(value + ' chained'))(success('success'))

    assert.strictEqual(result.tag, SUCCESS)
    assert.strictEqual(result.value, 'success chained')
  })
  test('tee should return value from parameter', () => {
    const result = tee((value) => { return value + ' tee' })(success('success'))

    assert.strictEqual(result.tag, SUCCESS)
    assert.strictEqual(result.value, 'success')
  })
})
