import { isFunction, isPlainObject, isUndefined } from 'is-what'
import type { Moola } from '@/index'

export function prop(this: Moola, property: string): any
export function prop(
  this: Moola,
  property: string | Record<string, any>,
  value?: any | ((index: number, oldValue: any) => any),
): Moola

export function prop(this: Moola, property: any, value?: any) {
  if (isUndefined(value) && !isPlainObject(property)) {
    //getter
    const el = this.elements.at(0)
    return getProperty(el, property)
  }

  // setter
  if (isPlainObject(property)) {
    // 批量设置
    for (const element of this.elements) {
      for (const [key, val] of Object.entries(property)) {
        Reflect.set(element, key, val)
      }
    }
  } else {
    // 单个设置
    for (const [index, element] of this.elements.entries()) {
      const newValue = isFunction(value)
        ? value.call(element, index, getProperty(element, property))
        : value

      if (!isUndefined(newValue)) {
        Reflect.set(element, property, newValue)
      }
    }
  }
  return this
}

function getProperty(el: any, name: string): any {
  return Reflect.get(el, name) ?? undefined
}
