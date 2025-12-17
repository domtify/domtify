import { isUndefined } from "is-what"
import { el } from "@/core.js"
import { collectAncestors } from "@/utils/collectAncestors.js"

export const parentsUntil = (selector, filter) => (els) =>
  collectAncestors(els, {
    until: !isUndefined(selector) ? el(selector) : [],
    filter,
  })
