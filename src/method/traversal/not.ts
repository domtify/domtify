import { isFunction } from 'is-what'
import { select } from '@/helpers/select'

export const not = selector => els => {
  // 情况 1：函数形式
  if (isFunction(selector)) {
    return els.filter(
      (element, index) => !selector.call(element, index, element),
    )
  }

  // 情况 2：选择器 / 元素 / 集合
  const notElements = select(selector)
  const notSet = new Set(notElements)

  return els.filter(element => !notSet.has(element))
}
