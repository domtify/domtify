import { flatElements } from '@/helpers/flatElements'
import { select } from '@/helpers/select'
import type { Selector } from '@/types'
import { append } from './append'

export const appendTo =
  <T extends Element = Element>(target: Selector) =>
  (els: T[]): T[] => {
    append(els)(flatElements(select(target)))
    return els
  }
