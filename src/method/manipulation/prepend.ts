import { insertNode } from '@/helpers/insertNode'

export const prepend =
  (...args) =>
  els =>
    insertNode(els, args, 'afterbegin')
