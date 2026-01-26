import { type InsertContents, insertNode } from '@/helpers/insertNode'
import type { PipeOperator } from '@/types'

export const append =
  (...content: InsertContents): PipeOperator =>
  els =>
    insertNode(els, content, 'beforeend')
