import { fn } from "@/core.js"

import "./toArray.js"

fn.unwrap = function (selector) {
  for (const el of this.toArray()) {
    const parent = el.parentNode

    if (
      !parent ||
      parent.nodeType !== Node.ELEMENT_NODE ||
      parent.tagName === "BODY" ||
      parent.tagName === "HTML"
    )
      continue // 跳过无父元素或非元素节点

    // 如果传了 selector 且父元素不匹配，跳过
    if (selector && !parent.matches(selector)) continue

    // 将父元素的子元素挨个移到父元素前面
    while (parent.firstChild) {
      parent.parentNode.insertBefore(parent.firstChild, parent)
    }

    // 移除父元素
    parent.remove()
  }
  return this
}
