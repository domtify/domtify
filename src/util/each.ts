import { isAnyObject, isNull } from 'is-what'
import { isArrayLike } from '@/helpers/isArrayLike.js'

export const each = (obj, callback) => {
  if (isNull(obj)) return obj

  // 数组或类数组
  if (isArrayLike(obj)) {
    for (const [index, value] of Array.from(obj).entries()) {
      if (callback.call(value, index, value) === false) {
        break
      }
    }
  } else if (isAnyObject(obj)) {
    // 普通对象
    for (const [key, value] of Object.entries(obj)) {
      if (callback.call(value, key, value) === false) {
        break
      }
    }
  }

  return obj
}
