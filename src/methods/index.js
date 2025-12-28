import { isString, isUndefined } from "is-what"

import { query } from "@/core.js"

export const index = (selector) => (els) => {
  let collection
  let find

  if (isUndefined(selector)) {
    find = els.at(0)
    // 没传递参数
    collection = Array.from(find?.parentElement?.children)
  } else {
    if (isString(selector)) {
      collection = query(selector)
      find = els.at(0)
    } else {
      collection = els
      find = query(selector).at(0)
    }
  }

  return collection.indexOf(find)
}
