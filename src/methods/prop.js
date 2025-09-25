import { isPlainObject, isUndefined, isFunction } from "is-what"
import { fn, domtify } from "@/core.js"

import "./toArray.js"

fn.prop = function (propertyName, value) {
  if (isUndefined(value) && !isPlainObject(propertyName)) {
    //getter
    const el = this.toArray().at(0)
    if (!el) return undefined
    return el[propertyName]
  } else {
    // setter
    if (isPlainObject(propertyName)) {
      // 批量设置
      for (const el of this.toArray()) {
        for (const [property, val] of Object.entries(propertyName)) {
          domtify(el).prop(property, val)
        }
      }
    } else {
      // 单个设置
      for (const [index, element] of this.toArray().entries()) {
        let newValue = isFunction(value)
          ? Reflect.apply(value, element, [
              index,
              domtify(element).prop(propertyName),
            ])
          : value

        if (!isUndefined(newValue)) {
          element[propertyName] = newValue
        }
      }
    }
    return this
  }
}
