import { isNull, isFullString } from "is-what"
// 把dash-case转换为小驼峰(camelCase)
const toCamel = (str) => {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

// 保持和jQuery相似的行为
const parseDataValue = (val) => {
  if (val === "true") return true
  if (val === "false") return false
  if (isNull(val)) return null
  if (isFullString(val) && !isNaN(val)) return Number(val)
  try {
    return JSON.parse(val)
  } catch {
    return val
  }
}

export { toCamel, parseDataValue }
