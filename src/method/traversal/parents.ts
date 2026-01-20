import { collectAncestors } from '@/helpers/collectAncestors'

export const parents = selector => els => collectAncestors(els, { selector })
