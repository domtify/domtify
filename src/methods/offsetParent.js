import { unique } from "@/utils/unique.js"

export const offsetParent = () => (els) => {
  const result = []

  for (const element of els) {
    if (element && element.offsetParent) {
      result.push(element.offsetParent)
    } else {
      // jQuery 在 offsetParent 为 null 时返回 documentElement
      result.push(document.documentElement)
    }
  }

  return unique(result)
}
