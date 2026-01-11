import { dom } from '@/core/dom.js'
import { unique } from '@/helpers/unique.js'

export const add = (selector, context) => els =>
  unique([...els, ...dom(selector, context)])
