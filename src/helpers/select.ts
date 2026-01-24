import { isArray, isFunction, isString } from 'is-what'
import { isHtmlString } from '@/helpers/isHtmlString'
import { onDOMContentLoaded } from '@/helpers/onDOMContentLoaded'
import type { Context, Selector, SelectorContext } from '@/types'
import { parseHTML } from '@/util/parseHTML'
export function select(
  selector: Selector,
  context: SelectorContext = document,
): Context {
  let elements: Context = []

  if (isString(selector)) {
    if (isHtmlString(selector)) {
      elements = parseHTML(selector, context)
    } else {
      try {
        elements = Array.from(context.querySelectorAll(selector))
      } catch {}
    }
  } else if (
    selector instanceof NodeList ||
    selector instanceof HTMLCollection
  ) {
    elements = Array.from(selector)
  } else if (isFunction(selector)) {
    onDOMContentLoaded(selector)
  } else if (isArray(selector)) {
    elements = [...selector]
  } else if (selector) {
    elements.push(selector)
  }
  return elements
}
