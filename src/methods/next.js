import { dirSibling } from "@/utils/dirSibling.js"

export const next = (selector) => (els) =>
  dirSibling(els, "next", { filter: selector })
