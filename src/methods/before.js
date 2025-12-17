import { insertNode } from "@/utils/insertNode.js"

export const before =
  (...args) =>
  (els) =>
    insertNode(els, args, "beforebegin", false)
