import { select } from '@/helpers/select'
import { find } from './find'

export const has = selector => els =>
  els.filter(element => find(selector)(select(element)).length)
