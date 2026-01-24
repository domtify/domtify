import { flatElements } from '@/helpers/flatElements'
import { select } from '@/helpers/select'
import { before } from './before'

export const insertBefore = target => els =>
  before(els)(flatElements(select(target)))
