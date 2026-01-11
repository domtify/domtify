import { dirSibling } from '@/helpers/dirSibling'

export const nextUntil = (selector, filter) => els =>
  dirSibling(els, 'next', {
    all: true,
    until: selector,
    filter,
  })
