import { isFunction, isNull, isPlainObject } from "is-what"
import { fn } from "@/core.js"

import "./toArray.js"

const Default = {
  // 立即运行
  immediate: false,
  // 监听类型,支持width、height
  type: "both",
}

const SYM_OBSERVER_KEY = Symbol("observer")

fn.resize = function (callback, options) {
  if (isFunction(callback)) {
    // setter

    const config = { ...Default, ...(isPlainObject(options) ? options : {}) }
    const lastSize = new WeakMap()

    for (const [index, element] of this.toArray().entries()) {
      // 创建ResizeObserver对象
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          const prev = lastSize.get(element) || {
            width: 0,
            height: 0,
            first: true,
          }

          if (!config.immediate && prev.first) {
            lastSize.set(element, { width, height, first: false })
            continue
          }

          const widthChanged = width !== prev.width
          const heightChanged = height !== prev.height

          if (
            (config.type === "width" && widthChanged) ||
            (config.type === "height" && heightChanged) ||
            (config.type === "both" && (widthChanged || heightChanged))
          ) {
            Reflect.apply(callback, element, [index, entry])
          }

          lastSize.set(element, { width, height, first: false })
        }
      })

      // 开始监听
      observer.observe(element)

      // 保存一份到dom对象
      Reflect.set(element, SYM_OBSERVER_KEY, observer)
    }
  } else if (isNull(callback)) {
    // clear
    for (const element of this.toArray()) {
      const observer = Reflect.get(element, SYM_OBSERVER_KEY)
      observer.disconnect()
      // 删除
      Reflect.deleteProperty(element, SYM_OBSERVER_KEY)
    }
  }

  return this
}
