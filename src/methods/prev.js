import { dirSibling } from "@/utils/dirSibling.js"

export const prev = (selector) => (els) =>
  dirSibling(els, "previous", { filter: selector })
