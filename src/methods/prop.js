import { isPlainObject, isUndefined, isFunction } from "is-what"
import { query } from "@/core.js"

export const prop = (propertyName, value) => (els) => {
  if (isUndefined(value) && !isPlainObject(propertyName)) {
    //getter
    const el = els.at(0)
    if (!el) return undefined
    return el[propertyName]
  } else {
    // setter
    if (isPlainObject(propertyName)) {
      // 批量设置
      for (const element of els) {
        for (const [property, val] of Object.entries(propertyName)) {
          prop(property, val)(query(element))
        }
      }
    } else {
      // 单个设置
      for (const [index, element] of els.entries()) {
        const newValue = isFunction(value)
          ? value.call(element, index, prop(propertyName)(query(element)))
          : value

        if (!isUndefined(newValue)) {
          element[propertyName] = newValue
        }
      }
    }
    return els
  }
}
