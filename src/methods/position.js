import { fn, domtify } from "@/core.js"
import { isInstanceOf } from "is-what"
import { cssInt } from "@/utils/cssInt.js"

import "./offset.js"
import "./toArray.js"

fn.position = function () {
  const element = this.toArray().at(0)

  if (!isInstanceOf(element, Element)) return undefined

  const style = getComputedStyle(element)
  const isFixed = style.position === "fixed"

  let offset
  if (isFixed) {
    const rect = element.getBoundingClientRect()
    offset = { top: rect.top, left: rect.left }
  } else {
    offset = domtify(element).offset()

    const offsetParent = getEffectiveOffsetParent(element)

    if (isInstanceOf(offsetParent, Element)) {
      // 一定要过滤否则可能是返回的顶级的doc
      const parentOffset = domtify(offsetParent).offset()
      const parentStyle = getComputedStyle(offsetParent)
      offset.top -= parentOffset.top + cssInt(parentStyle, "borderTopWidth")
      offset.left -= parentOffset.left + cssInt(parentStyle, "borderLeftWidth")
    }
  }

  // 统一减去 margin
  offset.top -= cssInt(style, "marginTop")
  offset.left -= cssInt(style, "marginLeft")

  return { top: offset.top, left: offset.left }
}

function getEffectiveOffsetParent(el) {
  const doc = el.ownerDocument
  let offsetParent = el.offsetParent

  if (!offsetParent) return doc

  if (
    (offsetParent === doc.body || offsetParent === doc.documentElement) &&
    getComputedStyle(offsetParent).position === "static"
  ) {
    return doc
  }

  return offsetParent
}
