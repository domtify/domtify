import { isFunction, isUndefined } from 'is-what'
import type { Moola } from '@/core/moola'
import { toArray } from '@/helpers/getArray'
import type { MoolaElement } from '@/types'

export type TextInput =
  | string
  | number
  | boolean
  | ((this: MoolaElement, index: number, oldText: string | null) => string)

export function text(this: Moola): string
export function text(this: Moola, value: TextInput): Moola
export function text(this: Moola, value?: TextInput) {
  const els = toArray(this)

  // Getter
  if (isUndefined(value)) {
    return els.map(el => el.textContent).join('')
  }

  // Setter
  for (const [index, el] of els.entries()) {
    const nextText = isFunction(value)
      ? value.call(el, index, (el as Node).textContent)
      : value
    el.textContent = String(nextText)
  }

  return this
}
