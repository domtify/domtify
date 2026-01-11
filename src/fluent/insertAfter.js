import { dom } from '@/core/dom.js'
import { flatElements } from '@/helpers/flatElements.js'
import { after } from './after.js'

export const insertAfter = target => els =>
  after(els)(flatElements(dom(target)))
