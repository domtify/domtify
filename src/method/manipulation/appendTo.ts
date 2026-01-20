import { query } from '@/core/query'
import { flatElements } from '@/helpers/flatElements'
import type { Selector } from '@/types'
import { append } from './append'

export const appendTo =
  <T extends Element = Element>(target: Selector) =>
  (els: T[]): T[] => {
    append(els)(flatElements(query(target)))
    return els
  }
