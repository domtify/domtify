import { dirSibling } from '@/helpers/dirSibling'

export const nextAll = selector => els =>
  dirSibling(els, 'next', { all: true, filter: selector })
