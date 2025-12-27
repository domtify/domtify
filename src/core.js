import { isString, isArray, isFunction } from "is-what"
import { isHtmlString } from "./utils/isHtmlString.js"
import { parseHTML } from "./utilities/parseHTML.js"
import { onDOMContentLoaded } from "./utils/onDOMContentLoaded.js"

export const d = (selector, context = document) => {
  let elements = []

  if (isString(selector)) {
    // 字符串处理
    if (isHtmlString(selector)) {
      elements = parseHTML(selector)
    } else {
      try {
        elements = Array.from(context.querySelectorAll(selector))
      } catch (error) {
        // 错误的选择器,什么操作都不做
      }
    }
  } else if (
    selector instanceof NodeList ||
    selector instanceof HTMLCollection
  ) {
    // 是直接传递的NodeList或者HTMLCollection集合
    elements = Array.from(selector)
  } else if (isFunction(selector)) {
    elements.push(document)
    // 是函数,就立马进行加载
    onDOMContentLoaded(selector)
  } else if (isArray(selector)) {
    // 是数组直接展开
    elements = [...selector]
  } else {
    selector && elements.push(selector)
  }

  return elements
}
