import { isArray, isFunction, isString } from 'is-what'
import { isHtmlString } from '@/helpers/isHtmlString'
import { isInstanceOf } from '@/helpers/isInstanceOf'
import { onDOMContentLoaded } from '@/helpers/onDOMContentLoaded'
import type { Context, MoolaElement, Selector } from '@/types'
import { parseHTML } from '@/util'
import { version } from '../../package.json' with { type: 'json' }

class Moola implements Iterable<MoolaElement> {
  // 上一个对象
  prevObject: Moola | null = null
  length = 0;
  [index: number]: MoolaElement
  [x: string]: any
  constructor(selector: Selector, context: Context = document) {
    let elements: MoolaElement[] = []
    // 如果已经是实例，无需处理直接返回
    if (isInstanceOf(selector, Moola)) {
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
      isInstanceOf(selector, NodeList) ||
      isInstanceOf(selector, HTMLCollection)
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
  *[Symbol.iterator](): IterableIterator<MoolaElement> {
    for (let i = 0; i < this.length; i++) {
      yield this[i]
    }
  }
}

//类的原型
const fn = Moola.prototype

/*  
 模仿jQuery的$('li').jquery = "3.7.1"
*/
fn.moola = version

// 唯一入口
const $ = (selector: Selector, context?: Context) => {
  const instance = new Moola(selector, context)

  const property = 'prevObject'
  if (
    isString(selector) &&
    !isHtmlString(selector) &&
    !selector.trimStart().startsWith('#')
  ) {
    const prev = new Moola(context as Selector)
    Reflect.deleteProperty(prev, property)
    instance.prevObject = prev
  } else {
    // 保持jQuery的行为,删除掉prevObject属性
    Reflect.deleteProperty(instance, property)
  }

  return instance
}

$.fn = $.prototype = fn

export { $ }
