import { isUndefined } from 'is-what'
import { unique } from './unique'

interface CollectAncestorsOptions {
  until?: HTMLElement[] // 遇到这些元素就停止
  filter?: string // CSS 选择器，用于筛选
  selector?: string // CSS 选择器，用于筛选
}

/**
 * 收集元素的所有父元素，可选停止条件和筛选器
 * @param elements 要收集父元素的元素数组
 * @param options 可选参数：until、filter、selector
 * @returns 去重后的父元素数组
 */
export const collectAncestors = (
  elements: HTMLElement[],
  { until = [], filter, selector }: CollectAncestorsOptions = {},
): HTMLElement[] => {
  let result: HTMLElement[] = []

  for (const el of elements) {
    let parent = el.parentElement
    while (parent) {
      // until 条件：遇到目标就停止
      if (until.length && until.includes(parent)) break

      result.push(parent)
      parent = parent.parentElement
    }
  }

  // selector 用于 parents
  if (!isUndefined(selector)) {
    result = result.filter(el => el.matches(selector))
  }

  // filter 用于 parentsUntil
  if (!isUndefined(filter)) {
    result = result.filter(el => el.matches(filter))
  }

  return unique(result)
}
