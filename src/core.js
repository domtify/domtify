import { isString, isInstanceOf, isArray, isFunction } from "is-what"
import { isHtmlString, parseHTML } from "@/utils/parseHtml.js"
import { version } from "../package.json" with { type: "json" }

const domContentLoadedCallbacks = []

class Domtify {
  // 上一个对象
  prevObject = null

  constructor(selector, context) {
    let elements = []
    // 如果已经是实例，无需处理直接返回
    if (isInstanceOf(selector, Domtify)) {
      return selector
    } else if (isString(selector)) {
      // 字符串处理
      if (isHtmlString(selector)) {
        elements = parseHTML(selector)
      } else {
        try {
          elements = Array.from(context.querySelectorAll(selector))
        } catch (error) {
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
      this.#onDOMContentLoaded(selector)
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

  #onDOMContentLoaded(callback) {
    if (document.readyState === "loading") {
      // 当文档处于加载状态时，在首次调用时添加监听器
      if (!domContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const callback of domContentLoadedCallbacks) {
            callback()
          }
        })
      }

      domContentLoadedCallbacks.push(callback)
    } else {
      callback()
    }
  }
}

//类的原型
const fn = Domtify.prototype

/*  
 在domtify上挂载一个domtify属性跟上版本号
 模仿jQuery的$('li').jquery = "3.7.1"
*/
fn.domtify = version

// 唯一入口
const domtify = (selector, context = document) => {
  const d = new Domtify(selector, context)

  const property = "prevObject"
  if (
    isString(selector) &&
    !isHtmlString(selector) &&
    !isIDSelector(selector)
  ) {
    const prev = new Domtify(context)
    Reflect.deleteProperty(prev, property)
    d.prevObject = prev
  } else {
    // 保持jQuery的行为,删除掉prevObject属性
    Reflect.deleteProperty(d, property)
  }

  return d
}

//把类原型赋值给构造函数的原型，最后再赋值给构造函数domtify的fn属性，在js中，函数也是一种特殊的对象，因此也可以拥有属性。
domtify.fn = domtify.prototype = fn

function isIDSelector(selector) {
  return selector.trimStart().startsWith("#")
}

export { domtify, fn, Domtify }
