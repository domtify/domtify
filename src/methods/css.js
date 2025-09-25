import {
  isArray,
  isFunction,
  isPlainObject,
  isString,
  isUndefined,
} from "is-what"
import { fn } from "@/core.js"

import "./toArray.js"

fn.css = function (property, value, priority) {
  if (isUndefined(value) && !isPlainObject(property)) {
    //getter
    const el = this.toArray().at(0)
    if (!el) return undefined

    // 获取单个属性
    if (isString(property)) {
      let propertyValue = getComputedStyle(el).getPropertyValue(property)
      return propertyValue ? propertyValue : undefined
    } else if (isArray(property)) {
      // 是数组的方式应该直接返回对象
      const computed = getComputedStyle(el)
      const result = {}

      for (const prop of property) {
        let propertyValue = computed?.getPropertyValue(prop)
        result[prop] = propertyValue ? propertyValue : undefined
      }
      return result
    }
  } else {
    //setter

    for (const [index, element] of this.toArray().entries()) {
      if (isString(property)) {
        // 设置单个属性
        let newValue = value
        if (isFunction(value)) {
          const oldValue = getComputedStyle(element).getPropertyValue(property)
          newValue = Reflect.apply(value, element, [index, oldValue.trim()])
        }
        element.style.setProperty(property, newValue, priority)
      } else if (isPlainObject(property)) {
        // 字面量对象直接批量设置
        for (const [key, val] of Object.entries(property)) {
          let value = val
          let priority = ""

          if (val?.endsWith("!important")) {
            // 提取出 value 和 priority
            value = val.replace(/\s*!important\s*$/, "") // 去掉后缀的 !important（兼容空格）
            priority = "important"
          }
          element.style.setProperty(key, value, priority)
        }
      }
    }
  }
  return this
}
