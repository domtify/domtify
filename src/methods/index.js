import { isString, isUndefined } from "is-what"
import { fn, domtify } from "@/core.js"

import "./toArray.js"

fn.index = function (selector) {
  let collection
  let find

  if (isUndefined(selector)) {
    find = this.toArray().at(0)
    // 没传递参数
    collection = Array.from(find?.parentElement?.children)
  } else {
    if (isString(selector)) {
      collection = domtify(selector).toArray()
      find = this.toArray().at(0)
    } else {
      collection = this.toArray()
      find = domtify(selector).toArray().at(0)
    }
  }

  return collection.indexOf(find)
}
