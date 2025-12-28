import { isString, isUndefined } from "is-what"

import { dom } from "@/core.js"

export const index = (selector) => (els) => {
  let collection
  let find

  if (isUndefined(selector)) {
    find = els.at(0)
    // 没传递参数
    collection = Array.from(find?.parentElement?.children)
  } else {
    if (isString(selector)) {
      collection = dom(selector)
      find = els.at(0)
    } else {
      collection = els
      find = dom(selector).at(0)
    }
  }

  return collection.indexOf(find)
}
