import { domtify } from "@/core.js"
import { isNull, isAnyObject } from "is-what"
import { isArrayLike } from "@/utils/isArrayLike.js"

domtify.each = function (obj, callback) {
  if (isNull(obj)) return obj

  // 数组或类数组
  if (isArrayLike(obj)) {
    for (const [index, value] of Array.from(obj).entries()) {
      if (Reflect.apply(callback, value, [index, value]) === false) {
        break
      }
    }
  } else if (isAnyObject(obj)) {
    // 普通对象
    for (const [key, value] of Object.entries(obj)) {
      if (Reflect.apply(callback, value, [key, value]) === false) {
        break
      }
    }
  }

  return obj
}
