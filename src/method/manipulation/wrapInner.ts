import { isFunction, isInstanceOf } from 'is-what'
import { select } from '@/helpers/select'

export const wrapInner = wrappingElement => els => {
  for (const [index, element] of els.entries()) {
    let wrapperEl = wrappingElement
    if (isFunction(wrappingElement)) {
      wrapperEl = wrappingElement.call(element, index)
    }
    wrapperEl = select(wrapperEl).at(0)
    if (!isInstanceOf(wrapperEl, Element)) continue

    // 克隆 wrapper 避免重复插入
    wrapperEl = wrapperEl.cloneNode(true)

    // 找到 wrapper 的最内层
    let deepest = wrapperEl
    while (deepest.firstElementChild) {
      deepest = deepest.firstElementChild
    }

    // 将原元素的子节点移动到最内层
    while (element.firstChild) {
      deepest.appendChild(element.firstChild)
    }

    // 将 wrapper 插入到原元素内部
    element.appendChild(wrapperEl)
  }
  return els
}
