import { dom } from '@/core/dom.js'
import { flatElements } from '@/helpers/flatElements.js'
import { append } from './append.js'

export const appendTo = target => els => {
  append(els)(flatElements(dom(target)))
  return els
}
