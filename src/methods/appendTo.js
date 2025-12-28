import { flatElements } from "@/utils/flatElements.js"
import { dom } from "@/core.js"
import { append } from "./append.js"

export const appendTo = (target) => (els) => {
  append(els)(flatElements(dom(target)))
  return els
}
