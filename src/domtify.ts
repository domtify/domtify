import { isString } from 'is-what'
import { Domtify, fn } from '@/core/Domtify'
import { isHtmlString } from './helpers/isHtmlString'
import type { DomtifyStatic, Selector, SelectorContext } from './types'

const domtify = ((selector: Selector, context?: SelectorContext) => {
  const instance = new Domtify(selector, context)
  const property = 'prevObject' as const
  if (
    isString(selector) &&
    !isHtmlString(selector) &&
    !selector.trimStart().startsWith('#')
  ) {
    const prev = new Domtify(context as Selector)
    Reflect.deleteProperty(prev, property)
    instance.prevObject = prev
  } else {
    Reflect.deleteProperty(instance, property)
  }
  return instance
}) as DomtifyStatic

domtify.fn = domtify.prototype = fn

export default domtify
export { domtify as d }
