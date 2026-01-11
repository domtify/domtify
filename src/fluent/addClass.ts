import { resolveClasses } from '@/helpers/resolveClasses'

export const addClass = className => els => {
  for (const [index, element] of els.entries()) {
    const classes = resolveClasses(element, index, className)
    element.classList.add(...classes)
  }
  return els
}
