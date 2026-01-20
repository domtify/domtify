import * as methods from '@/method'
import type { Context, Selector } from '@/types'
import { version } from '../../package.json' with { type: 'json' }
import { select } from './select'

type FluentMethod = (...args: any[]) => (els: any[]) => any

type MethodsMap = {
  [K in keyof typeof methods]: (typeof methods)[K] extends FluentMethod
    ? (typeof methods)[K]
    : never
}

class Domtify {
  results
  static domtify = version

  constructor(selector: Selector, context: Context) {
    if (selector instanceof Domtify) {
      return selector
    }
    this.results = select(selector, context)
  }

  get length(): number {
    return this.results!.length
  }
}

// 显式映射，避免动态访问 namespace import
const methodMap: MethodsMap = methods as MethodsMap

for (const key in methodMap) {
  Domtify.prototype[key] = function (...args: any[]) {
    const result = methodMap[key](...args)(this.results)

    if (key === 'get') return result
    if (!Array.isArray(result)) return result

    this.results = result
    return this
  }
}

export default Domtify
