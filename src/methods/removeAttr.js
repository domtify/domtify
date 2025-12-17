import { isString } from "is-what"

export const removeAttr = (attributeName) => (els) => {
  if (!isString(attributeName)) return els

  const attrs = attributeName.trim().split(/\s+/)

  for (const element of els) {
    for (const attr of attrs) {
      element.removeAttribute(attr)
    }
  }

  return els
}
