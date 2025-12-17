import { isNull, isUndefined } from "is-what"

export const get = (index) => (els) => {
  if (isUndefined(index) || isNull(index)) return els

  const i = Number(index)
  return Number.isInteger(i) ? els.at(i) : undefined
}
