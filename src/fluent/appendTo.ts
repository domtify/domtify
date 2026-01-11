import { dom } from '@/core/dom'
import { flatElements } from '@/helpers/flatElements'
import { append } from './append'

export const appendTo = target => els => {
  append(els)(flatElements(dom(target)))
  return els
}
