import { isFunction, isUndefined } from 'is-what'
import type { Context } from '@/types'

export const text = text => (els: Context) => {
  if (isUndefined(text)) {
    //Getter:
    return els.map(el => el.textContent).join('')
  }
  // Setter:
  for (const [index, el] of els.entries()) {
    el.textContent = String(
      isFunction(text) ? text.call(el, index, el.textContent) : text,
    )
  }
  return els
}
