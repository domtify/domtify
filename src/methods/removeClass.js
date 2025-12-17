import { resolveClasses } from "@/utils/resolveClasses.js"

export const removeClass = (className) => (els) => {
  for (const [index, element] of els.entries()) {
    const classes = resolveClasses(element, index, className)
    element?.classList?.remove(...classes)
  }
  return els
}
