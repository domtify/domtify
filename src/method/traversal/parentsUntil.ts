import { isUndefined } from 'is-what'
import { collectAncestors } from '@/helpers/collectAncestors'
import { select } from '@/helpers/select'

export const parentsUntil = (selector, filter) => els =>
  collectAncestors(els, {
    until: !isUndefined(selector) ? select(selector) : [],
    filter,
  })
