import { isString } from 'is-what'
import type { Moola } from '@/index'

export function removeProp(this: Moola, propertyName: string) {
  if (!isString(propertyName)) return this.elements

  for (const element of this.elements) {
    Reflect.deleteProperty(element, propertyName)
  }
  return this
}
