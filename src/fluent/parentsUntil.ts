import { isUndefined } from 'is-what'
import { dom } from '@/core/dom'
import { collectAncestors } from '@/helpers/collectAncestors'

export const parentsUntil = (selector, filter) => els =>
  collectAncestors(els, {
    until: !isUndefined(selector) ? dom(selector) : [],
    filter,
  })
