import { insertNode } from "@/utils/insertNode.js"

export const after =
  (...args) =>
  (els) =>
    insertNode(els, args, "afterend")
