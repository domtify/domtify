import { dirSibling } from '@/helpers/dirSibling.js'

export const nextAll = selector => els =>
  dirSibling(els, 'next', { all: true, filter: selector })
