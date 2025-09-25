import { domtify } from "@/core.js"
import { isNull, isAnyObject } from "is-what"
import { isArrayLike } from "@/utils/isArrayLike.js"

domtify.map = (array, callback) => {
  const result = []

  if (isArrayLike(array)) {
    for (const [index, value] of Array.from(array).entries()) {
      const val = callback(value, index)

      if (!isNull(val)) result.push(val)
    }
  } else if (isAnyObject(array)) {
    for (const [key, value] of Object.entries(array)) {
      const val = callback(value, key)
      if (!isNull(val)) result.push(val)
    }
  }

  // 扁平化嵌套数组
  return result.flat(Infinity)
}
