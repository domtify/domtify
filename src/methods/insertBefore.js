import { flatElements } from "@/utils/flatElements.js"
import { el } from "@/core.js"
import { before } from "./before.js"

export const insertBefore = (target) => (els) =>
  before(els)(flatElements(el(target)))
