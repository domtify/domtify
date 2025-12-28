import { isString, isFunction } from "is-what"
import { query } from "@/core.js"

export const filter = (selector) => (els) => {
  const callbackFn = isFunction(selector)
    ? selector
    : isString(selector)
      ? (_, item) => item?.matches?.(selector || "*")
      : (_, item) => query(selector).includes(item)

  return els.filter((item, index) => callbackFn.call(item, index, item))
}
