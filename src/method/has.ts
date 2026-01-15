import { dom } from '@/core/dom'
import { find } from './find'

export const has = selector => els =>
  els.filter(element => find(selector)(dom(element)).length)
