import { dom } from '@/core/dom'
import { flatElements } from '@/helpers/flatElements'
import { after } from './after'

export const insertAfter = target => els =>
  after(els)(flatElements(dom(target)))
