import { isFunction } from "is-what"
import { dom } from "@/core.js"

export const wrap = (wrappingElement) => (els) => {
  for (const [index, element] of els.entries()) {
    let wrapper = isFunction(wrappingElement)
      ? wrappingElement.call(element, index)
      : wrappingElement
    wrapper = dom(wrapper).at(0)

    if (!wrapper) return els

    const clone = wrapper.cloneNode(true)

    // 找到最深的子元素（作为包裹目标）
    let deepest = clone
    while (deepest.firstElementChild) {
      deepest = deepest.firstElementChild
    }

    // 1.把包裹元素插入元素之前
    element?.parentNode?.insertBefore(clone, element)

    // 2.包裹元素最深的子元素再添加子元素就可以实现wrap的行为
    deepest?.appendChild(element)
  }

  return els
}
