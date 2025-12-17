import { resolveClasses } from "@/utils/resolveClasses.js"

export const toggleClass = (className, state) => (els) => {
  for (const [index, element] of els.entries()) {
    const classes = resolveClasses(element, index, className, state)
    for (const cls of classes) {
      element?.classList?.toggle(cls, state)
    }
  }
  return els
}
