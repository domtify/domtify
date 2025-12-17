export const each = (callback) => (els) => {
  for (const [index, element] of els.entries()) {
    const res = callback.call(element, index, element)
    if (res === false) break
  }
  return els
}
