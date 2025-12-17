import { unique } from "@/utils/unique.js"

export const children = (selector) => (els) => {
  const result = unique(
    els.flatMap((el) => (el?.children ? Array.from(el.children) : [])),
  )

  return selector ? result.filter((el) => el.matches(selector)) : result
}
