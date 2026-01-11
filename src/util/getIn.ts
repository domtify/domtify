import { isUndefined } from 'is-what'
import { normalizeKeys } from '@/helpers/normalizeKeys'

/**
 * 安全获取对象属性，支持数组索引
 * @param {Object} obj - 源对象
 * @param {string|Array} path - 属性路径，例如 "a[0].b.c" 或 ["a",0,"b","c"]
 * @param {*} defaultValue - 默认值
 */
export const getIn = (obj, path, defaultValue) => {
  if (!obj) return defaultValue
  const keys = normalizeKeys(path)

  return (
    keys.reduce(
      (acc, key) => (!isUndefined(acc?.[key]) ? acc[key] : undefined),
      obj,
    ) ?? defaultValue
  )
}
