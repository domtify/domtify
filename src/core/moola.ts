import { isArray, isFunction, isString } from 'is-what'
import { isHtmlString } from '@/helpers/isHtmlString'
import { isInstanceOf } from '@/helpers/isInstanceOf'
import { onDOMContentLoaded } from '@/helpers/onDOMContentLoaded'
import type * as methods from '@/method'

import type {
  Context,
  FnMethods,
  MoolaElement,
  MoolaStatic,
  Selector,
} from '@/types'
import { parseHTML } from '@/util'

class Moola implements Iterable<MoolaElement> {
  public elements: MoolaElement[] = []

  constructor(selector: Selector, context: Context = document) {
    // 如果已经是实例，无需处理直接返回
    if (isInstanceOf(selector, Moola)) {
      return selector
    } else if (isString(selector)) {
      // 字符串处理
      if (isHtmlString(selector)) {
        this.elements = parseHTML(selector)
      } else {
        try {
          this.elements = Array.from(context.querySelectorAll(selector))
        } catch (_error) {
          // 错误的选择器,什么操作都不做
        }
      }
    } else if (
      isInstanceOf(selector, NodeList) ||
      isInstanceOf(selector, HTMLCollection)
    ) {
      //是直接传递的NodeList或者HTMLCollection集合
      this.elements = Array.from(selector)
    } else if (isFunction(selector)) {
      this.elements.push(document) // 保持和jquery类似的行为
      // 是函数,就立马进行加载
      onDOMContentLoaded(selector)
    } else if (isArray(selector)) {
      //是数组直接展开
      this.elements = [...selector]
    } else {
      selector && this.elements.push(selector)
    }
  }
  [Symbol.iterator]() {
    return this.elements[Symbol.iterator]()
  }
  get length() {
    return this.elements.length
  }
}

// type MethodsMap = {
//   [K in keyof typeof methods]: (typeof methods)[K]
// }

type Methods = typeof methods
interface Moola extends Methods {}

//类的原型
const fn = Moola.prototype

// 唯一入口
const moola = ((selector: Selector, context?: Context) =>
  new Moola(selector, context)) as MoolaStatic

moola.fn = moola.prototype = fn

moola.use = (methods: FnMethods) => {
  Object.assign(moola.fn, methods)
  return moola
}

export { moola, moola as $, type Moola }
