import { dom } from '@/core/dom.js'
import { flatElements } from '@/helpers/flatElements.js'
import { before } from './before.js'

export const insertBefore = target => els =>
  before(els)(flatElements(dom(target)))
