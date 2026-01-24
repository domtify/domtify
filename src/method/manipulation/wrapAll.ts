import { isFunction, isInstanceOf } from 'is-what'
import { select } from '@/helpers/select'

export const wrapAll = wrappingElement => els => {
  if (!els.length) return els

  const firstEl = els.at(0)
  let wrapperEl = wrappingElement
  if (isFunction(wrappingElement)) {
    // 回调函数返回包装元素
    wrapperEl = wrappingElement.call(firstEl)
  }

  wrapperEl = select(wrapperEl).at(0)
  if (!isInstanceOf(wrapperEl, Element)) return els
  wrapperEl = wrapperEl.cloneNode(true)

  const parent = firstEl.parentNode
  if (!parent) return els

  // 将 wrappingElement 插入到第一个元素前面
  parent.insertBefore(wrapperEl, firstEl)

  // 找到 wrappingElement 的最内层元素
  let deepest = wrapperEl
  while (deepest.firstElementChild) {
    deepest = deepest.firstElementChild
  }

  // 将所有目标元素移动到最内层
  for (const el of els) {
    deepest.appendChild(el)
  }

  return els
}
