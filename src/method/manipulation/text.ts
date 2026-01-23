import { isFunction, isUndefined } from 'is-what'
import type { Context, ContextUnit } from '@/types'

type TextSetterCallback = (
  el: ContextUnit,
  index: number,
  oldText: string | null,
) => string | number

export function text(): (els: Context) => string
export function text(
  value: string | number | boolean,
): (els: Context) => Context
export function text(value: TextSetterCallback): (els: Context) => Context
export function text(value?: string | number | boolean | TextSetterCallback) {
  return (els: Context) => {
    // Getter
    if (isUndefined(value)) {
      return els.map(el => el.textContent).join('')
    }

    // Setter
    for (const [index, el] of els.entries()) {
      const nextText = isFunction(value)
        ? value(el, index, (el as Node).textContent)
        : value
      el.textContent = String(nextText)
    }

    return els
  }
}
