import { isUndefined } from 'is-what'
import { unique } from './unique.js'

export const collectAncestors = (
  elements,
  { until = [], filter, selector } = {},
) => {
  let result = []

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
