import { dirSibling } from "@/utils/dirSibling.js"

export const nextUntil = (selector, filter) => (els) =>
  dirSibling(els, "next", {
    all: true,
    until: selector,
    filter,
  })
