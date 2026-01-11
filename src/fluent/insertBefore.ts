import { dom } from '@/core/dom'
import { flatElements } from '@/helpers/flatElements'
import { before } from './before'

export const insertBefore = target => els =>
  before(els)(flatElements(dom(target)))
