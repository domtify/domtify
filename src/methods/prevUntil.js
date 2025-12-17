import { dirSibling } from "@/utils/dirSibling.js"

export const prevUntil = (selector, filter) => (els) =>
  dirSibling(els, "previous", {
    all: true,
    until: selector,
    filter,
  })
