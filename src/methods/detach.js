import { isUndefined } from "is-what"
import { fn } from "@/core.js"

import "./toArray.js"

fn.detach = function (selector) {
  let elements = this.toArray()

  if (!isUndefined(selector)) {
    elements = elements.filter((el) => el.matches(selector))
  }

  for (const element of elements) {
    element.remove() // 直接从 DOM 删除
  }

  return this
}
