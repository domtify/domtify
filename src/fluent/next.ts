import { dirSibling } from '@/helpers/dirSibling'

export const next = selector => els =>
  dirSibling(els, 'next', { filter: selector })
