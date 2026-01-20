import { type ClassInput, resolveClasses } from '@/helpers/resolveClasses'
import type { Context } from '@/types'

export const addClass =
  (className: ClassInput) =>
  (els: Context): Context => {
    for (const [index, element] of els.entries()) {
      const classes = resolveClasses(element, index, className)

      ;(element as Element)?.classList?.add(...classes)
    }
    return els
  }
