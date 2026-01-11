import { collectAncestors } from '@/helpers/collectAncestors.js'

export const parents = selector => els => collectAncestors(els, { selector })
