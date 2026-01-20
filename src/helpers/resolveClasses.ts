import { isArray, isFunction, isString, isUndefined } from 'is-what'
import type { ContextUnit } from '@/types'

export type ClassInput =
  | string
  | string[]
  | ((
      element: ContextUnit,
      index: number,
      current: string,
      state?: any,
    ) => string | string[] | undefined)

/**
 * 解析元素的 class
 * @param element DOM 节点
 * @param index 当前索引（在循环中的索引）
 * @param className class 可以是字符串、数组或函数
 * @param state 可选状态
 * @returns 字符串数组
 */
export const resolveClasses = (
  element: ContextUnit,
  index: number,
  className?: ClassInput,
  state?: boolean,
): string[] => {
  let value: string | string[] | undefined

  if (isFunction(className)) {
    value = className(
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
