import { isFunction, isString } from "is-what"
import { fn, domtify } from "@/core.js"
import { pushStack } from "@/utils/pushStack.js"

import "./toArray.js"

fn.filter = function (selector) {
  let result
  let callbackFn

  if (isFunction(selector)) {
    // 传入函数：直接调用
    callbackFn = selector
  } else if (isString(selector)) {
    // 选择器字符串
    callbackFn = (_, item) => item?.matches?.(selector || "*")
  } else {
    // 其它任意情况,直接统一转换成domtify对象,再取出它的集合再过滤
    callbackFn = (_, item) => domtify(selector).toArray().includes(item)
  }

  // 用数组filter方法过滤
  result = this.toArray().filter((item, index) =>
    Reflect.apply(callbackFn, item, [index, item]),
  )

  return pushStack(this, result)
}
