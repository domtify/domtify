import { type ClassInput, resolveClasses } from '@/helpers/resolveClasses'

export const addClass =
  <T extends Element = Element>(className: ClassInput) =>
  (els: T[]): T[] => {
    for (const [index, element] of els.entries()) {
      const classes = resolveClasses(element, index, className)

      element?.classList?.add(...classes)
    }
    return els
  }
