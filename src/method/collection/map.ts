import { isArray, isNull, isUndefined } from 'is-what'

export const map = callback => els => {
  const result = []

  for (const [i, el] of els.entries()) {
    const value = callback.call(el, i, el)

    if (isArray(value)) {
      result.push(...value)
    } else if (!isUndefined(value) && !isNull(value)) {
      result.push(value)
    }
  }

  return result
}
