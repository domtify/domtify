import { insertNode } from '@/helpers/insertNode.js'

export const before =
  (...args) =>
  els =>
    insertNode(els, args, 'beforebegin', false)
