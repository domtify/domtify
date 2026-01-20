import { select } from '@/core/select'
import * as methods from '@/method'
import type { Context, Selector, SelectorContext } from '@/types'
import { version } from '../../package.json' with { type: 'json' }

class Domtify {
  results: Context = [];

  [key: string]: any

  constructor(selector: Selector, context?: SelectorContext) {
    if (selector instanceof Domtify) {
      return selector
    }
    this.results = select(selector, context)
  }
  get length() {
    return this.results.length
  }
}

Domtify.prototype.domtify = version

type MethodsMap = {
  [K in keyof typeof methods]: (typeof methods)[K]
}
const methodsMap: MethodsMap = methods as MethodsMap

for (const key of Object.keys(methodsMap) as (keyof MethodsMap)[]) {
  Domtify.prototype[key] = function (
    // ...args: Parameters<MethodsMap[typeof key]>
    ...args: any[]
  ) {
    const result = methodsMap[key](args)(this.results)

    // if (key === 'get') return result
    if (!Array.isArray(result)) return result

    this.results = result
    return this
  }
}

export default Domtify
