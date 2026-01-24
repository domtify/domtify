import {
  isFunction,
  isNull,
  isPlainObject,
  isString,
  isUndefined,
} from 'is-what'
import { select } from '@/helpers/select'

export const attr = (name, value) => els => {
  if (isUndefined(value) && !isPlainObject(name)) {
    // getter
    const el = els.at(0)
    if (!el) return undefined
    const attribute = el.getAttribute(name)
    return attribute ? attribute : undefined
  }
  //setter
  for (const [index, element] of els.entries()) {
    if (isString(name)) {
      if (isNull(value) || (value === false && !name.startsWith('aria-'))) {
        // 如果是null或者是非ARIA 属性的通过传递false来删除
        element.removeAttribute(name)
      } else if (isFunction(value)) {
        const newVal = value.call(element, index, attr(name)(select(element)))

        if (!isNull(newVal)) {
          element.setAttribute(name, newVal)
        }
      } else {
        element.setAttribute(name, value)
      }
    }
    if (isPlainObject(name)) {
      for (const [key, val] of Object.entries(name)) {
        attr(key, val)(select(element))
      }
    }
  }
}
