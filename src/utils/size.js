import { isFunction, isNumber, isString } from "is-what"
import { cssInt } from "./cssInt.js"
import { BOX_PROPS } from "@/constants/index.js"

export function isBorderBox(el) {
  return getComputedStyle(el).boxSizing === "border-box"
}

export function ucfirst(str) {
  return str[0].toUpperCase() + str.slice(1)
}

export function getContentSize(el, prop) {
  const style = getComputedStyle(el)
  let size = parseFloat(style[prop])

  if (isBorderBox(el)) {
    size -= getContentExtra(el, prop)
  }

  return size
}

export function getWindowSize(prop) {
  return window[`inner${ucfirst(prop)}`]
}

export function getDocumentSize(doc, prop) {
  const { body, documentElement: html } = doc
  return Math.max(
    body[`scroll${ucfirst(prop)}`],
    body[`offset${ucfirst(prop)}`],
    html[`client${ucfirst(prop)}`],
    html[`scroll${ucfirst(prop)}`],
    html[`offset${ucfirst(prop)}`],
  )
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

function sumStyle(el, keys) {
  const style = getComputedStyle(el)
  return keys.reduce((sum, key) => sum + cssInt(style, key), 0)
}

function resolveToPx(el, prop, value) {
  const prev = el.style[prop]
  el.style[prop] = value
  const px = parseFloat(getComputedStyle(el)[prop])
  el.style[prop] = prev
  return px
}

function getContentExtra(el, prop) {
  return prop === "height"
    ? sumStyle(el, [...BOX_PROPS.BORDER_Y, ...BOX_PROPS.PADDING_Y])
    : sumStyle(el, [...BOX_PROPS.BORDER_X, ...BOX_PROPS.PADDING_X])
}

export function setContentSize(el, prop, value) {
  if (isBorderBox(el)) {
    value += getContentExtra(el, prop)
  }
  el.style[prop] = `${value}px`
}
