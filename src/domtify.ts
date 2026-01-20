import Domtify from '@/core/Domtify'
import type { Selector, SelectorContext } from '@/types'
import * as utils from '@/util'

const domtify = (selector: Selector, context?: SelectorContext) =>
  new Domtify(selector, context)

domtify.fn = domtify.prototype = Domtify.prototype

Object.assign(domtify, utils)

export default domtify
