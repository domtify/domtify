import * as methods from '@/fluent/methods'

type FluentMethod = (...args: any[]) => (els: any[]) => any

type MethodsMap = {
  [K in keyof typeof methods]: (typeof methods)[K] extends FluentMethod
    ? (typeof methods)[K]
    : never
}

class Domtify<T = any> {
  results: T[]

  constructor(els: T[]) {
    this.results = els
  }

  get length(): number {
    return this.results.length
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
