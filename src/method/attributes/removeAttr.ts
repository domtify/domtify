import { isString } from 'is-what'
import type { Moola } from '@/index'

export function removeAttr(this: Moola, attributeName: string) {
  if (!isString(attributeName)) return this.elements

  const attrs = attributeName.trim().split(/\s+/)

  for (const element of this.elements) {
    for (const attr of attrs) {
      ;(element as Element)?.removeAttribute(attr)
    }
  }

  return this
}
