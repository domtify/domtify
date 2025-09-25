import { domtify, fn } from "@/core.js"
import { isFunction, isInstanceOf } from "is-what"

import "./toArray.js"

fn.wrapAll = function (wrappingElement) {
  if (!this.length) return this

  const firstEl = this.toArray().at(0)
  let wrapperEl = wrappingElement
  if (isFunction(wrappingElement)) {
    // 回调函数返回包装元素
    wrapperEl = Reflect.apply(wrappingElement, firstEl, [])
  }

  wrapperEl = domtify(wrapperEl).toArray().at(0)
  if (!isInstanceOf(wrapperEl, Element)) return this
  wrapperEl = wrapperEl.cloneNode(true)

  const parent = firstEl.parentNode
  if (!parent) return this

  // 将 wrappingElement 插入到第一个元素前面
  parent.insertBefore(wrapperEl, firstEl)

  // 找到 wrappingElement 的最内层元素
  let deepest = wrapperEl
  while (deepest.firstElementChild) {
    deepest = deepest.firstElementChild
  }

  // 将所有目标元素移动到最内层
  for (const el of this.toArray()) {
    deepest.appendChild(el)
  }

  return this
}
