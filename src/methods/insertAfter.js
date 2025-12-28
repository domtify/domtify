import { flatElements } from "@/utils/flatElements.js"
import { dom } from "@/core.js"
import { after } from "./after.js"

export const insertAfter = (target) => (els) =>
  after(els)(flatElements(dom(target)))
