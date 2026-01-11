import { dom } from '@/core/dom.js'
import { flatElements } from '@/helpers/flatElements.js'
import { prepend } from './prepend.js'

export const prependTo = target => els => {
  prepend(els)(flatElements(dom(target)))
  return els
}
