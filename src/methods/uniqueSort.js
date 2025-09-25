import { isInstanceOf } from "is-what"
import { fn } from "@/core.js"
import { uniqueArray } from "@/utils/uniqueArray.js"

import "./toArray.js"

fn.uniqueSort = function () {
  // 过滤掉非 Element 的节点
  let result = this.toArray().filter((el) => isInstanceOf(el, Element))

  // 去重
  result = uniqueArray(result)

  // 按文档顺序排序
  result.sort((a, b) => {
    if (a === b) return 0
    if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
      return -1
    }
    return 1
  })

  this.result = result
  return this
}
