import { isArray, isNumber } from "is-what"

export const isArrayLike = (obj) => {
  const length = !!obj && obj.length

  return (
    isArray(obj) ||
    length === 0 ||
    (isNumber(length) && length > 0 && Reflect.has(obj, length - 1))
  )
}
