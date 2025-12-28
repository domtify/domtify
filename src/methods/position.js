import { cssInt } from "@/utils/cssInt.js"
import { dom } from "@/core.js"
import { offset } from "./offset.js"
import { isInstanceOf } from "is-what"

const getEffectiveOffsetParent = (el) => {
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

export const position = () => (els) => {
  const element = els.at(0)

  if (!isInstanceOf(element, Element)) return undefined

  const style = getComputedStyle(element)
  const isFixed = style.position === "fixed"

  let offsetRes
  if (isFixed) {
    const rect = element.getBoundingClientRect()
    offsetRes = { top: rect.top, left: rect.left }
  } else {
    offsetRes = offset()(dom(element))

    const offsetParent = getEffectiveOffsetParent(element)

    if (offsetParent instanceof Element) {
      // 一定要过滤否则可能是返回的顶级的doc
      const parentOffset = offset()(dom(offsetParent))
      const parentStyle = getComputedStyle(offsetParent)
      offsetRes.top -= parentOffset.top + cssInt(parentStyle, "borderTopWidth")
      offsetRes.left -=
        parentOffset.left + cssInt(parentStyle, "borderLeftWidth")
    }
  }

  // 统一减去 margin
  offsetRes.top -= cssInt(style, "marginTop")
  offsetRes.left -= cssInt(style, "marginLeft")

  return { top: offsetRes.top, left: offsetRes.left }
}
