import type { Moola } from '@/index'

export function hasClass(this: Moola, className: string) {
  return this.elements.some(el =>
    (el as Element)?.classList?.contains(className),
  )
}
