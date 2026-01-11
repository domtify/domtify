import { insertNode } from '@/helpers/insertNode.js'

export const prepend =
  (...args) =>
  els =>
    insertNode(els, args, 'afterbegin')
