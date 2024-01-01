import { describe, test } from 'node:test'
import assert from 'node:assert'
import { FAILURE, SUCCESS, failure, isSuccess, success } from '../src/index.js'

describe('Result creation', () => {
  test('should be success', () => {
    const result = success('success')

    assert.strictEqual(result.tag, SUCCESS)
    assert.strictEqual(result.value, 'success')
  })
  test('should be failure', () => {
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
})
