import { dirSibling } from '@/helpers/dirSibling.js'

export const prevAll = selector => els =>
  dirSibling(els, 'previous', { all: true, filter: selector })
