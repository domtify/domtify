import { el } from "@/core.js"
import { find } from "./find.js"

export const has = (selector) => (els) =>
  els.filter((element) => find(selector)(el(element)).length)
