import { insertNode } from '@/helpers/insertNode'

export const after =
  (...args) =>
  els =>
    insertNode(els, args, 'afterend')
