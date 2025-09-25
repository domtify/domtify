import { isUndefined } from "is-what"
import { fn, domtify } from "@/core.js"

import "./off.js"
import "./removeData.js"
import "./toArray.js"

fn.remove = function (selector) {
  let elements = this.toArray()

  if (!isUndefined(selector)) {
    elements = elements.filter((el) => el.matches(selector))
  }

  for (const element of elements) {
    element.remove() // 直接从 DOM 删除
  }

  // 移除事件和data
  domtify(elements).off().removeData()

  return this
}
