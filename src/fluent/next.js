import { dirSibling } from '@/helpers/dirSibling.js'

export const next = selector => els =>
  dirSibling(els, 'next', { filter: selector })
