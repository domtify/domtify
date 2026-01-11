import { dirSibling } from '@/helpers/dirSibling.js'

export const prevUntil = (selector, filter) => els =>
  dirSibling(els, 'previous', {
    all: true,
    until: selector,
    filter,
  })
