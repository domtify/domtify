import { flatElements } from "@/utils/flatElements.js"
import { dom } from "@/core.js"
import { before } from "./before.js"

export const insertBefore = (target) => (els) =>
  before(els)(flatElements(dom(target)))
