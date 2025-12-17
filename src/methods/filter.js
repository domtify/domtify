import { isString, isFunction } from "is-what"
import { el } from "@/core.js"

export const filter = (selector) => (els) => {
  const callbackFn = isFunction(selector)
    ? selector
    : isString(selector)
      ? (_, item) => item?.matches?.(selector || "*")
      : (_, item) => el(selector).includes(item)

  return els.filter((item, index) => callbackFn.call(item, index, item))
}
