import { flatElements } from "@/utils/flatElements.js"
import { el } from "@/core.js"
import { append } from "./append.js"

export const appendTo = (target) => (els) => {
  append(els)(flatElements(el(target)))
  return els
}
