import Domtify from '@/core/Domtify.js'
import { dom } from '@/core/dom.js'
import * as utils from '@/util/index'

const domtify = (selector, cxt) => new Domtify(dom(selector, cxt))
domtify.fn = domtify.prototype = Domtify.prototype
Object.assign(domtify, utils)

export default domtify
