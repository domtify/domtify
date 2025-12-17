import { isArray, isString } from "is-what"

export const normalizeKeys = (path) => {
  if (isArray(path)) return path
  if (isString(path)) return path.replace(/\[(\d+)]/g, ".$1").split(".")
  return [path] // 包括 symbol 或其他类型
}
