import { dirSibling } from '@/helpers/dirSibling.js'

export const prev = selector => els =>
  dirSibling(els, 'previous', { filter: selector })
