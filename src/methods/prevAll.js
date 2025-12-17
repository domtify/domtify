import { dirSibling } from "@/utils/dirSibling.js"

export const prevAll = (selector) => (els) =>
  dirSibling(els, "previous", { all: true, filter: selector })
