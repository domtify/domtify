import { isInstanceOf } from "is-what"
import { flatElements } from "@/utils/flatElements.js"
import { dom } from "@/core.js"

// 检查元素是否在页面上
const isInPage = (node) => {
  return (
    isInstanceOf(node, Node) &&
    node !== document.body &&
    document.body.contains(node)
  )
}

export const replaceAll = (target) => (els) => {
  const result = []

  //过滤出元素且真实存在在页面上的
  const targets = flatElements(dom(target), false).filter((target) =>
    isInPage(target),
  )

  const currResult = flatElements(els, false).filter((curr) =>
    isInstanceOf(curr, Node),
  )

  for (const [index, element] of targets.entries()) {
    for (const el of currResult) {
      const content = index === targets.length - 1 ? el : el.cloneNode(true)
      result.push(content)
      element.replaceWith(content)
    }
  }
  return result
}
