import { isUndefined } from 'is-what'
import { get } from './get'
export const eq = index => els => {
  const result = []

  if (isUndefined(index)) return result

  const el = get(index)(els)

  !isUndefined(el) && result.push(el)
  return result
}
