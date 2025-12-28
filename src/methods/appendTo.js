import { flatElements } from "@/utils/flatElements.js"
import { query } from "@/core.js"
import { append } from "./append.js"

export const appendTo = (target) => (els) => {
  append(els)(flatElements(query(target)))
  return els
}
