import Domtify from '@/core/Domtify'
import { dom } from '@/core/dom'
import * as utils from '@/util/index'

const domtify = (selector, cxt) => new Domtify(dom(selector, cxt))
domtify.fn = domtify.prototype = Domtify.prototype
Object.assign(domtify, utils)

export default domtify
