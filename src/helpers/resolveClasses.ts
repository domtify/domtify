import { isArray, isFunction, isString, isUndefined } from 'is-what'
import type { MoolaElement } from '@/types'

export type ClassInput =
  | string
  | string[]
  | ((
      this: MoolaElement,
      index: number,
      current: string,
      state?: any,
    ) => string | string[] | undefined)

export const resolveClasses = (
  element: MoolaElement,
  index: number,
  className?: ClassInput,
  state?: boolean,
): string[] => {
  let value: string | string[] | undefined

  if (isFunction(className)) {
    value = className.call(
      element,
      index,
      (element as Element)?.classList?.value ?? '',
      state,
    )
  } else if (isUndefined(className)) {
    value = (element as Element).classList.value
  } else {
    value = className
  }

  if (isArray(value)) {
    return value.flatMap(v => String(v).split(' '))
  }

  if (isString(value)) {
    return value.split(' ')
  }

  return []
}
