import { type InsertContents, insertNode } from '@/helpers/insertNode'

export const append =
  <T extends Element = Element>(...content: InsertContents<T>) =>
  (els: T[]): T[] =>
    insertNode(els, content, 'beforeend')
