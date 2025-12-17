import { flatElements } from "@/utils/flatElements.js"
import { el } from "@/core.js"
import { prepend } from "./prepend.js"

export const prependTo = (target) => (els) => {
  prepend(els)(flatElements(el(target)))
  return els
}
