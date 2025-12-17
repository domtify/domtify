import { insertNode } from "@/utils/insertNode.js"

export const append =
  (...args) =>
  (els) =>
    insertNode(els, args, "beforeend")
