import { isFunction } from "is-what"
import { domtify, fn } from "@/core.js"

import "./toArray.js"

fn.wrap = function (wrappingElement) {
  for (const [index, element] of this.toArray().entries()) {
    let wrapper = isFunction(wrappingElement)
      ? Reflect.apply(wrappingElement, element, [index])
      : wrappingElement
    wrapper = domtify(wrapper).toArray().at(0)

    if (!wrapper) return this // 如果没有找到元素直接提前退出避免浪费性能

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

  return this
}
