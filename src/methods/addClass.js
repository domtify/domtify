import { resolveClasses } from "@/utils/resolveClasses.js"

import { el } from "@/core.js"

export const addClass = (className) => (els) => {
  for (const [index, element] of els.entries()) {
    const classes = resolveClasses(element, index, className)
    element.classList.add(...classes)
  }
  return els
}

const addClass2 = (els, className) => {
  // 内部统一使用el转换一下,这样无论外部传入什么比如字符串，nodeList 还是别的类型都能统一转换成元素数组
  let elements = el(els)
  for (const [index, element] of elements.entries()) {
    const classes = resolveClasses(element, index, className)
    element.classList.add(...classes)
  }
  return els
}
