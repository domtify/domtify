import { collectAncestors } from "@/utils/collectAncestors.js"

export const parents = (selector) => (els) =>
  collectAncestors(els, { selector })
