import { dom } from "@/core.js"
import { unique } from "@/utils/unique.js"

export const add = (selector, context) => (els) =>
  unique([...els, ...dom(selector, context)])
