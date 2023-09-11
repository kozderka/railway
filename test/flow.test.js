/*
test('Call with empty argumets', () => {
  const result = flow()('')

  expect(result).toEqual('')
})

test('Call async / sync functions with failure', async () => {
  const result = flow(
    add1,
    chain(add2Async),
    chain(addFail),
    chain(add3Async),
    chain(add1)
  )(0)

  await expect(result).resolves.toEqual(failure('failure'))
})

test('Call async / sync functions with success result', async () => {
  const result = flow(add1, chain(add2Async), chain(add3Async), chain(add1))(0)

  await expect(result).resolves.toEqual(success(7))
})

test('Call async functions with success result', async () => {
  const result = flow(add1Async, chain(add2Async), chain(add3Async))(0)

  await expect(result).resolves.toEqual(success(6))
})

test('Call async functions in correct order', () => {
  const result = flow(
    append1Async,
    chain(append2Async),
    chain(append3Async)
  )('')

  expect(result).resolves.toEqual(success('123'))
})

test('Call functions with success result', () => {
  const result = flow(add1, chain(add2), chain(add3))(0)

  expect(result).toEqual(success(6))
})

test('Call functions in correct order', () => {
  const result = flow(append1, chain(append2), chain(append3))('')

  expect(result).toEqual(success('123'))
})

test('Call functions with failure', () => {
  const result = flow(add1, chain(add2), chain(add3), chain(addFail))(0)

  expect(result).toEqual(failure('failure'))
})

test('Call clasic functions', () => {
  const result = flow(
    add1WithoutRailwayResult,
    add2WithoutRailwayResult,
    add3WithoutRailwayResult
  )(0)

  expect(result).toEqual(6)
})

test('Mix clasic and railway functions', () => {
  const result = flow(
    add1WithoutRailwayResult,
    add2,
    chain(toResult(add3WithoutRailwayResult, 'failure'))
  )(0)

  expect(result).toEqual(success(6))
})
*/
