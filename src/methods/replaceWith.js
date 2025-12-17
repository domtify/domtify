import { isFunction, isInstanceOf } from "is-what"
import { flatElements } from "@/utils/flatElements.js"

export const replaceWith = (newContent) => (els) => {
  for (const [index, element] of els.entries()) {
    if (!isInstanceOf(element, Element)) continue

    const value = isFunction(newContent)
      ? newContent.call(element, index, element.textContent ?? "")
      : newContent

    element.replaceWith(...flatElements(value, false))
  }

  return els
}
