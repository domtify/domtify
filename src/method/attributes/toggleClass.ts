import { type ClassInput, resolveClasses } from '@/helpers/resolveClasses'
import type { Moola } from '@/index'

export function toggleClass(
  this: Moola,
  className: ClassInput,
  state?: boolean,
) {
  for (const [index, element] of this.elements.entries()) {
    const classes = resolveClasses(element, index, className, state)
    for (const cls of classes) {
      ;(element as Element)?.classList?.toggle(cls, state)
    }
  }
  return this
}
