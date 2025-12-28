import { flatElements } from "@/utils/flatElements.js"
import { dom } from "@/core.js"
import { prepend } from "./prepend.js"

export const prependTo = (target) => (els) => {
  prepend(els)(flatElements(dom(target)))
  return els
}
