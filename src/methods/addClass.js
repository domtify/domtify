import { resolveClasses } from "@/utils/resolveClasses.js"

export const addClass = (className) => (els) => {
  for (const [index, element] of els.entries()) {
    const classes = resolveClasses(element, index, className)
    element.classList.add(...classes)
  }
  return els
}
