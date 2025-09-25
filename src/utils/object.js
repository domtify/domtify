import { isArray, isUndefined, isAnyObject, isString } from "is-what"

/**
 * 安全获取对象属性，支持数组索引
 * @param {Object} obj - 源对象
 * @param {string|Array} path - 属性路径，例如 "a[0].b.c" 或 ["a",0,"b","c"]
 * @param {*} defaultValue - 默认值
 */
function getIn(obj, path, defaultValue) {
  if (!obj) return defaultValue
  const keys = normalizeKeys(path)

  return (
    keys.reduce(
      (acc, key) => (!isUndefined(acc?.[key]) ? acc[key] : undefined),
      obj,
    ) ?? defaultValue
  )
}

/**
 * 设置对象属性，支持数组索引
 * @param {Object} obj - 目标对象
 * @param {string|Array} path - 属性路径，例如 "a[0].b.c" 或 ["a",0,"b","c"]
 * @param {*} value - 要设置的值
 */
function setIn(obj, path, value) {
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

function normalizeKeys(path) {
  if (isArray(path)) return path
  if (isString(path)) return path.replace(/\[(\d+)]/g, ".$1").split(".")
  return [path] // 包括 symbol 或其他类型
}

export { getIn, setIn }
