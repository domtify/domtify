import type { EachArrayCallback, Moola, MoolaElement } from '@/index'

export function each(this: Moola, callback: EachArrayCallback<MoolaElement>) {
  for (const [index, element] of this.elements.entries()) {
    const res = callback.call(element, index, element)
    if (res === false) break
  }
  return this
}
