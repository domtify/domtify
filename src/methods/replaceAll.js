import { domtify, fn } from "@/core.js"
import { isInstanceOf } from "is-what"
import { flatElements } from "@/utils/flatElements.js"
import { pushStack } from "@/utils/pushStack.js"

fn.replaceAll = function (target) {
  const result = []

  //过滤出元素且真实存在在页面上的
  const targets = flatElements(domtify(target), false).filter((target) =>
    isInPage(target),
  )

  const currResult = flatElements(this, false).filter((curr) =>
    isInstanceOf(curr, Node),
  )

  for (const [index, element] of targets.entries()) {
    for (const el of currResult) {
      const content = index === targets.length - 1 ? el : el.cloneNode(true)
      result.push(content)
      element.replaceWith(content)
    }
  }
  return pushStack(this, result)
}

// 检查元素是否在页面上
function isInPage(node) {
  return (
    isInstanceOf(node, Node) &&
    node !== document.body &&
    document.body.contains(node)
  )
}
