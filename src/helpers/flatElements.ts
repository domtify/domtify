import { isString } from 'is-what'
import type { Selector } from '@/types'
import { select } from './select'

export const flatElements = <T = unknown>(
  input: unknown,
  filterStrings = true,
): T[] => {
  const result: T[] = []
  const stack: unknown[] = [input]

  while (stack.length) {
    const v = stack.pop()

    if (Array.isArray(v)) {
      stack.push(...v)
      continue
    }

    if (filterStrings && isString(v)) {
      result.push(v as unknown as T)
      continue
    }

    result.push(...(select(v as Selector) as unknown as T[]))
  }

  return result
}
