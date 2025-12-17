import { isUndefined } from "is-what"
import { removeData } from "./removeData.js"
import { off } from "./off.js"

export const remove = (selector) => (els) => {
  let elements = els

  if (!isUndefined(selector)) {
    elements = elements.filter((el) => el.matches(selector))
  }

  for (const element of elements) {
    element.remove() // 直接从 DOM 删除
  }

  // 移除事件和data
  off()(els)
  removeData()(els)

  return els
}
