import {
  isUndefined,
  isFunction,
  isNumber,
  isString,
  isBoolean,
  isInstanceOf,
} from "is-what"

const UNIT_SUFFIX = "px"

import { el } from "@/core.js"

/**
 * 通用的尺寸处理函数 适用于 height width innerHeight outerHeight outerWidth innerWidth
 * @param {Array} els - 元素数组
 * @param {String} prop - "height" | "width"
 * @param {Object} options - 配置
 *   - mode: "content" | "inner" | "outer"
 *   - includeMargin: boolean (仅 outer 时有效)
 * @param {*} value - 设置的值 (可选)
 */
function dimension(els, prop, options, value) {
  let { mode = "content", includeMargin = false } = options

  if (isUndefined(value) || (mode === "outer" && isBoolean(value))) {
    // getter
    const el = els.at(0)
    if (!el) return undefined

    if (el === window) {
      return prop === "height" ? window.innerHeight : window.innerWidth
    }

    if (el === document) {
      const html = el.documentElement
      const body = el.body
      return Math.max(
        body[`scroll${ucfirst(prop)}`],
        body[`offset${ucfirst(prop)}`],
        html[`client${ucfirst(prop)}`],
        html[`scroll${ucfirst(prop)}`],
        html[`offset${ucfirst(prop)}`],
      )
    }

    if (!isInstanceOf(el, Element)) return undefined
    const style = getComputedStyle(el)
    let size = parseFloat(style[prop])

    if (mode === "content") {
      // height/width
      if (isBorderBox(style))
        size -= getExtraSize(style, prop, "padding+border")
    } else if (mode === "inner") {
      if (isBorderBox(style)) size -= getExtraSize(style, prop, "border")
      else size += getExtraSize(style, prop, "padding")
    } else if (mode === "outer") {
      if (!isBorderBox(style))
        size += getExtraSize(style, prop, "padding+border")

      if (includeMargin) size += getExtraSize(style, prop, "margin")
    }

    return size
  } else {
    // setter
    for (const [index, element] of els.entries()) {
      if (!isInstanceOf(element, Element)) continue
      const style = getComputedStyle(element)

      let finalVal = value

      if (isFunction(value)) {
        const oldVal = dimension(el(element), prop, {
          mode,
          includeMargin,
        })

        finalVal = value.call(element, index, oldVal)
      }

      if (isNumber(finalVal) || Number.isFinite(Number(finalVal))) {
        finalVal = parseFloat(finalVal)

        if (!isOuterMode(mode)) {
          if (mode === "content" && isBorderBox(style)) {
            finalVal += getExtraSize(style, prop, "padding+border")
          } else if (mode === "inner" && isBorderBox(style)) {
            finalVal += getExtraSize(style, prop, "border")
          }
        } else {
          if (includeMargin) finalVal -= getExtraSize(style, prop, "margin")
          if (!isBorderBox(style)) {
            finalVal -= getExtraSize(style, prop, "padding+border")
          }
        }

        element.style[prop] = toPx(finalVal)
      } else if (isString(finalVal)) {
        if (!finalVal.endsWith(UNIT_SUFFIX)) {
          // 如果不是px结尾就先设置上去
          element.style[prop] = finalVal
        }
        // 此时就得到了px单位的长度
        finalVal = parseFloat(style[prop])

        if (!isOuterMode(mode)) {
          // 不是outer调用方式
          if (isBorderBox(style)) {
            // 还得加上元素的内边距和边框的宽度

            finalVal = toPx(
              finalVal + getExtraSize(style, prop, "padding+border"),
            )
          }
        } else if (includeMargin) {
          let value = finalVal - getExtraSize(style, prop, "margin")
          if (!isBorderBox(style)) {
            value -= getExtraSize(style, prop, "padding+border")
          }

          finalVal = toPx(value)
        } else {
          if (!isBorderBox(style)) {
            finalVal = toPx(
              finalVal - getExtraSize(style, prop, "padding+border"),
            )
          }
        }
        element.style[prop] = finalVal
      }
    }
    return els
  }
}

/* 工具函数 */
function isBorderBox(style) {
  return style.boxSizing === "border-box"
}
function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function isOuterMode(mode) {
  return !["content", "inner"].includes(mode)
}

function toPx(value) {
  return `${value}${UNIT_SUFFIX}`
}

/**
 * 获取额外尺寸
 * @param {CSSStyleDeclaration} style
 * @param {"height"|"width"} prop
 * @param {"padding"|"border"|"padding+border"|"margin"} type
 */
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

export { dimension }
