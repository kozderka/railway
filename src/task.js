export function chain (f) {
  return (value) => {
    return Promise.resolve(f(value))
  }
}
