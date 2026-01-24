import { isFunction, isString } from 'is-what'
import { select } from '@/helpers/select'

export const filter = selector => els => {
  const callbackFn = isFunction(selector)
    ? selector
    : isString(selector)
      ? (_, item) => item?.matches?.(selector || '*')
      : (_, item) => select(selector).includes(item)

  return els.filter((item, index) => callbackFn.call(item, index, item))
}
