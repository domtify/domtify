import { isArray, isFunction, isString } from 'is-what'
import { isHtmlString } from '@/helpers/isHtmlString'
import { onDOMContentLoaded } from '@/helpers/onDOMContentLoaded'
import type { Context, Selector, SelectorContext } from '@/types'
import { parseHTML } from '@/util/parseHTML'

export type Operator<T = Context> = (ctx: T) => T | undefined
export type OperatorInput<T = Context> = Operator<T> | OperatorInput<T>[]

export function dom(fn: () => void): void
export function dom(
  selector: Exclude<Selector, Function>,
  ...operators: OperatorInput[]
): Context
export function dom(
  selector: Exclude<Selector, Function>,
  context: SelectorContext,
  ...operators: OperatorInput[]
): Context
export function dom(...args: any[]) {
  const selector = args.shift()
  let context = document

  if (typeof args[0] === 'string' || args[0] instanceof Element) {
    context = args.shift()
  }

  const operators = flattenOperators(args)
  let ctx = select(selector, context)

  for (const op of operators) {
    const res = op(ctx)
    if (res) ctx = res
  }

  return ctx
}

function flattenOperators(input: OperatorInput[], result: Operator[] = []) {
  for (const item of input) {
    if (Array.isArray(item)) {
      flattenOperators(item, result)
    } else if (typeof item === 'function') {
      result.push(item)
    }
  }
  return result
}

function select(
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
