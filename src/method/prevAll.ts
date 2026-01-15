import { dirSibling } from '@/helpers/dirSibling'

export const prevAll = selector => els =>
  dirSibling(els, 'previous', { all: true, filter: selector })
