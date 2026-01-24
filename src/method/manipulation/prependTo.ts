import { flatElements } from '@/helpers/flatElements'
import { select } from '@/helpers/select'
import { prepend } from './prepend'

export const prependTo = target => els => {
  prepend(els)(flatElements(select(target)))
  return els
}
