import { isFunction, isString } from 'is-what'
import { dom } from '@/core/dom'

export const filter = selector => els => {
  const callbackFn = isFunction(selector)
    ? selector
    : isString(selector)
      ? (_, item) => item?.matches?.(selector || '*')
      : (_, item) => dom(selector).includes(item)

  return els.filter((item, index) => callbackFn.call(item, index, item))
}
