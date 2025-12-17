import { flatElements } from "@/utils/flatElements.js"
import { el } from "@/core.js"
import { after } from "./after.js"

export const insertAfter = (target) => (els) =>
  after(els)(flatElements(el(target)))
