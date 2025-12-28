import { flatElements } from "@/utils/flatElements.js"
import { query } from "@/core.js"
import { prepend } from "./prepend.js"

export const prependTo = (target) => (els) => {
  prepend(els)(flatElements(query(target)))
  return els
}
