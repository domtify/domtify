import { insertNode } from '@/helpers/insertNode'

export const append =
  (...args) =>
  els =>
    insertNode(els, args, 'beforeend')
