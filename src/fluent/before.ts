import { insertNode } from '@/helpers/insertNode'

export const before =
  (...args) =>
  els =>
    insertNode(els, args, 'beforebegin', false)
