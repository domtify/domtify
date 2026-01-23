import { isArray, isFunction, isString } from 'is-what'
import { isHtmlString } from '@/helpers/isHtmlString'
import { onDOMContentLoaded } from '@/helpers/onDOMContentLoaded'
import type {
  Context,
  ContextUnit,
  DomtifyPrototype,
  PlainObject,
  Selector,
  SelectorContext,
} from '@/types'
import { parseHTML } from '@/util/parseHTML'
import { version } from '../../package.json' with { type: 'json' }

class Domtify {
  prevObject: Domtify | undefined
  length: number = 0;
  [index: number]: ContextUnit

  constructor(selector: Selector, context: SelectorContext = document) {
    let elements: Context = []
    // 如果已经是实例，无需处理直接返回
    if (selector instanceof Domtify) {
      return selector
    } else if (isString(selector)) {
      // 字符串处理
      if (isHtmlString(selector)) {
        elements = parseHTML(selector)
      } else {
        try {
          elements = Array.from(context.querySelectorAll(selector))
        } catch (_error) {
          // 错误的选择器,什么操作都不做
        }
      }
    } else if (
      selector instanceof NodeList ||
      selector instanceof HTMLCollection
    ) {
      //是直接传递的NodeList或者HTMLCollection集合
      elements = Array.from(selector)
    } else if (isFunction(selector)) {
      elements.push(document) // 保持和jquery类似的行为
      // 是函数,就立马进行加载
      onDOMContentLoaded(selector)
    } else if (isArray(selector)) {
      //是数组直接展开
      elements = [...selector]
    } else {
      selector && elements.push(selector)
    }

    for (const [index, element] of elements.entries()) {
      this[index] = element
    }
    this.length = elements.length
  }
}
interface Domtify extends DomtifyPrototype {}

// 类的原型 - 使用接口来确保类型安全
const fn: DomtifyPrototype = Domtify.prototype

// 设置版本号
fn.domtify = version

fn.extend = (methods: PlainObject<Function>) => {
  Object.assign(fn, methods)
}

export { fn, Domtify }
