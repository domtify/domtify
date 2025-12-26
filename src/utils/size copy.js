import { isFunction, isNumber, isString } from "is-what"
import { cssInt } from "./cssInt.js"

const UNIT = "px"

export function toPx(val) {
  return `${val}${UNIT}`
}

export function isBorderBox(style) {
  return style.boxSizing === "border-box"
}

export function ucfirst(str) {
  return str[0].toUpperCase() + str.slice(1)
}

export function getRawSize(el, prop) {
  const style = getComputedStyle(el)
  return parseFloat(style[prop])
}

export function getContentSize(el, prop) {
  const style = getComputedStyle(el)
  let size = getRawSize(el, prop)

  if (isBorderBox(style)) {
    size -= getExtraSize(style, prop, "padding+border")
  }

  return size
}

export function getInnerSize(el, prop) {
  const style = getComputedStyle(el)
  let size = getRawSize(el, prop)

  if (isBorderBox(style)) {
    size -= getExtraSize(style, prop, "border")
  } else {
    size += getExtraSize(style, prop, "padding")
  }

  return size
}

export function getOuterSize(el, prop, includeMargin = false) {
  const style = getComputedStyle(el)
  let size = getRawSize(el, prop)

  if (!isBorderBox(style)) {
    size += getExtraSize(style, prop, "padding+border")
  }

  if (includeMargin) {
    size += getExtraSize(style, prop, "margin")
  }

  return size
}

export function getWindowSize(prop) {
  return window[`inner${ucfirst(prop)}`]
}

export function getDocumentSize(el, prop) {
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

function isBorderBox2(el) {
  const style = getComputedStyle(el)
  return style.boxSizing === "  "
}

// 获取最终的值
export function getFinalVal(el, prop, value, index, oldVal) {
  if (isFunction(value)) {
    return value.call(el, index, oldVal)
  }

  if (isNumber(value)) {
    return value
  }

  if (isString(value)) {
    // 是数字字符串(没有单位的)
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      return parseFloat(value)
    }

    // 带单位的字符串
    if (!value.endsWith("px")) {
      // 如果不是px结尾的就直接设置给它
      el.style[prop] = value
    }
    // 再次读取可以得到单位为px的尺寸
    return parseFloat(getComputedStyle(el)[prop])
  }

  return undefined
}

export function getHeightPadding(style) {
  return cssInt(style, "paddingTop") + cssInt(style, "paddingBottom")
}

export function getWidthPadding(style) {
  return cssInt(style, "paddingLeft") + cssInt(style, "paddingRight")
}

export function getHeightBorder(style) {
  return cssInt(style, "borderTopWidth") + cssInt(style, "borderBottomWidth")
}

export function getWidthBorder(style) {
  return cssInt(style, "borderLeftWidth") + cssInt(style, "borderRightWidth")
}

export function getHeightMargin(style) {
  return cssInt(style, "marginTop") + cssInt(style, "marginBottom")
}

export function getWidthMargin(style) {
  return cssInt(style, "marginLeft") + cssInt(style, "marginRight")
}

// 应该要做的事情是只管设置Content的尺寸,别的都不管
export function setContentSize(el, prop, value) {
  const style = getComputedStyle(el)
  const extra =
    prop === "height"
      ? getHeightBorder(style) + getHeightPadding(style)
      : getWidthBorder(style) + getWidthPadding(style)

  return isBorderBox(style) ? value + extra : value - extra
}
