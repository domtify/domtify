import { flatElements } from '@/helpers/flatElements'
import { select } from '@/helpers/select'
import { after } from './after'

export const insertAfter = target => els =>
  after(els)(flatElements(select(target)))
