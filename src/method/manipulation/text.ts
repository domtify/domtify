import { isFunction, isUndefined } from 'is-what'
import type { Moola } from '@/core/moola'
import type { MoolaElement } from '@/types'

export type TextInput =
  | string
  | number
  | boolean
  | ((this: MoolaElement, index: number, oldText: string | null) => string)

export function text(this: Moola): string
export function text(this: Moola, value: TextInput): Moola
export function text(this: Moola, value?: TextInput) {
  // Getter
  if (isUndefined(value)) {
    return this.elements.map(el => el.textContent).join('')
  }

  // Setter
  for (const [index, el] of this.elements.entries()) {
    const nextText = isFunction(value)
      ? value.call(el, index, (el as Node).textContent)
      : value
    el.textContent = String(nextText)
  }

  return this
}
