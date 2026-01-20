import { dirSibling } from '@/helpers/dirSibling'

export const prev = selector => els =>
  dirSibling(els, 'previous', { filter: selector })
