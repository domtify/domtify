// 把dash-case转换为小驼峰(camelCase)
export const toCamel = (str) => {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}
