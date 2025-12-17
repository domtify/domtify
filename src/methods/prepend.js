import { insertNode } from "@/utils/insertNode.js"

export const prepend =
  (...args) =>
  (els) =>
    insertNode(els, args, "afterbegin")
