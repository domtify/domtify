import {
  getContentSize,
  getWindowSize,
  getDocumentSize,
  getFinalVal,
  setContentSize,
} from "@/utils/size.js"
import {
  isUndefined,
  isInstanceOf,
  isFunction,
  isNumber,
  isString,
} from "is-what"

export const height = (value) => (els) => {
  if (isUndefined(value)) {
    const el = els.at(0)
    if (!el) return undefined

    if (el === window) {
      return getWindowSize("height")
    }
    if (el === document) {
      return getDocumentSize(el, "height")
    }
    return getContentSize(el, "height")
  }
  for (const [index, element] of els.entries()) {
    if (!isInstanceOf(element, Element)) continue
    const style = getComputedStyle(element)

    let finalVal = value

    if (isFunction(value)) {
      const oldVal = height()

      finalVal = value.call(element, index, oldVal)
    }

    if (isNumber(finalVal) || Number.isFinite(Number(finalVal))) {
      finalVal = parseFloat(finalVal)

      if (isBorderBox(style)) {
        finalVal += getExtraSize(style, "height", "padding+border")
      } else {
        finalVal -= getExtraSize(style, "height", "padding+border")
      }

      element.style["height"] = toPx(finalVal)
    } else if (isString(finalVal)) {
      if (!finalVal.endsWith("px")) {
        // 如果不是px结尾就先设置上去
        element.style["height"] = finalVal
      }
      // 此时就得到了px单位的长度
      finalVal = parseFloat(style["height"])

      if (isBorderBox(style)) {
        // 还得加上元素的内边距和边框的宽度

        finalVal = toPx(
          finalVal + getExtraSize(style, "height", "padding+border"),
        )
      } else {
        finalVal = toPx(
          finalVal - getExtraSize(style, "height", "padding+border"),
        )
      }

      element.style["height"] = finalVal
    }
  }

  return els
}

function toPx(value) {
  return `${value}px`
}

function isBorderBox(style) {
  return style.boxSizing === "border-box"
}
function getExtraSize(style, prop, type) {
  const map = {
    height: {
      padding: ["paddingTop", "paddingBottom"],
      border: ["borderTopWidth", "borderBottomWidth"],
      margin: ["marginTop", "marginBottom"],
    },
    width: {
      padding: ["paddingLeft", "paddingRight"],
      border: ["borderLeftWidth", "borderRightWidth"],
      margin: ["marginLeft", "marginRight"],
    },
  }

  // 特殊处理 padding+border
  if (type === "padding+border") {
    return (
      getExtraSize(style, prop, "padding") + getExtraSize(style, prop, "border")
    )
  }

  const keys = map[prop][type]
  if (!keys) return 0

  return keys.reduce((sum, key) => sum + parseFloat(style[key] || 0), 0)
}
