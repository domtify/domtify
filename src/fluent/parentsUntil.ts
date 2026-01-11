import { isUndefined } from 'is-what'
import { dom } from '@/core/dom.js'
import { collectAncestors } from '@/helpers/collectAncestors.js'

export const parentsUntil = (selector, filter) => els =>
  collectAncestors(els, {
    until: !isUndefined(selector) ? dom(selector) : [],
    filter,
  })
