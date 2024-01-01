import { describe, test } from 'node:test'
import assert from 'node:assert'
import { FAILURE, SUCCESS, failure, success } from '../src/index.js'

describe('Railway', () => {
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
