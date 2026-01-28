import {
  isFunction,
  isNull,
  isPlainObject,
  isString,
  isUndefined,
} from 'is-what'
import { isInstanceOf } from '@/helpers/isInstanceOf'
import type { Moola } from '@/index'

type AttrValue =
  | string
  | number
  | boolean
  | null
  | ((index: number, oldValue: string | undefined) => AttrValue)
type AttrMap = Record<string, Exclude<AttrValue, Function>>

export function attr(this: Moola, attr: string): string | undefined
export function attr(
  this: Moola,
  attr: string | AttrMap,
  value?: AttrValue,
): Moola
export function attr(this: Moola, attr: any, value?: any) {
  // getter
  if (isUndefined(value) && !isPlainObject(attr)) {
    const el = this.elements.at(0)

    if (!isInstanceOf(el, Element)) return undefined

    return getAttr(el, attr)
  }

  // setter
  for (const [index, element] of this.elements.entries()) {
    if (!isInstanceOf(element, Element)) continue

    if (isString(attr)) {
      setAttr(element, attr, value, index)
    }

    if (isPlainObject(attr)) {
      for (const [key, val] of Object.entries(attr)) {
        setAttr(element, key, val, index)
      }
    }
  }

  return this
}

function getAttr(el: Element, name: string): string | undefined {
  return el.getAttribute(name) ?? undefined
}

function setAttr(el: Element, name: string, value: any, index: number) {
  if (isNull(value) || (value === false && !name.startsWith('aria-'))) {
    el.removeAttribute(name)
  } else if (isFunction(value)) {
    const oldVal = getAttr(el, name)
    const newVal = value.call(el, index, oldVal)
    if (!isNull(newVal)) el.setAttribute(name, String(newVal))
  } else {
    el.setAttribute(name, String(value))
  }
}
