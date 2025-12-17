import { dirSibling } from "@/utils/dirSibling.js"

export const nextAll = (selector) => (els) =>
  dirSibling(els, "next", { all: true, filter: selector })
