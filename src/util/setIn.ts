import { isAnyObject } from 'is-what'
import { normalizeKeys } from '@/helpers/normalizeKeys'

/**
 * 设置对象属性，支持数组索引
 * @param {Object} obj - 目标对象
 * @param {string|Array} path - 属性路径，例如 "a[0].b.c" 或 ["a",0,"b","c"]
 * @param {*} value - 要设置的值
 */
export const setIn = (obj, path, value) => {
  if (!obj) return obj
  const keys = normalizeKeys(path)

  keys.reduce((acc, key, idx) => {
    const isLast = idx === keys.length - 1
    if (isLast) {
      acc[key] = value
    } else {
      if (!(key in acc) || !isAnyObject(acc[key])) {
        // 如果下一个是数字，则创建数组，否则创建对象
        acc[key] = /^\d+$/.test(keys[idx + 1]) ? [] : {}
      }
    }
    return acc[key]
  }, obj)

  return obj // 返回原对象，保持 lodash 风格
}
