import { failure, success } from '../src/result.js'

export function add1WithoutRailwayResult(x) {
  return x + 1
}

export function add2WithoutRailwayResult(x) {
  return x + 2
}

export function add3WithoutRailwayResult(x) {
  return x + 3
}

export function add1(x) {
  return success(x + 1)
}

export function add2(x) {
  return success(x + 2)
}

export function add3(x) {
  return success(x + 3)
}

export async function add1Async(x) {
  return success(x + 1)
}

export async function add2Async(x) {
  return success(x + 2)
}

export async function add3Async(x) {
  return success(x + 3)
}

export function append1(s) {
  return success(s + '1')
}

export function append2(s) {
  return success(s + '2')
}

export function append3(s) {
  return success(s + '3')
}

export async function append1Async(s) {
  return success(s + '1')
}

export async function append2Async(s) {
  return success(s + '2')
}

export async function append3Async(s) {
  return success(s + '3')
}

export function addFail(x) {
  return failure('failure')
}

export async function addFailAsync(x) {
  return failure('failure')
}
