import { dom } from '@/core/dom'
import { flatElements } from '@/helpers/flatElements'
import { prepend } from './prepend'

export const prependTo = target => els => {
  prepend(els)(flatElements(dom(target)))
  return els
}
