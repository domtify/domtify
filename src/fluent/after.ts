import { insertNode } from '@/helpers/insertNode.js'

export const after =
  (...args) =>
  els =>
    insertNode(els, args, 'afterend')
