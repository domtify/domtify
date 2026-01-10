import { isFunction, isNumber, isString } from "is-what"
import { cssInt } from "./cssInt.js"
import { BOX_PROPS } from "@/constants/index.js"

export function isBorderBox(el) {
  return getComputedStyle(el).boxSizing === "border-box"
}

export function ucfirst(str) {
  return str[0].toUpperCase() + str.slice(1)
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

export function resolveSizeValue(el, value, index, oldVal) {
  if (isFunction(value)) {
    return value.call(el, index, oldVal)
  }
  return value
}

export function sumStyle(el, keys) {
  const style = getComputedStyle(el)
  return keys.reduce((sum, key) => sum + cssInt(style, key), 0)
}

// export function resolveToPx(el, prop, value) {
//   const prev = el.style[prop]
//   el.style[prop] = value
//   const px = parseFloat(getComputedStyle(el)[prop])
//   el.style[prop] = prev
//   return px
// }

export function resolveToPx(el, prop, value) {
  const style = el.style
  const hadInline = style.getPropertyValue(prop) !== ""

  const prev = style.getPropertyValue(prop)

  style.setProperty(prop, value)

  const px = parseFloat(getComputedStyle(el)[prop])

  if (hadInline) {
    style.setProperty(prop, prev)
  } else {
    style.removeProperty(prop)
  }

  return px
}

export function getComputedSize(el, property) {
  return parseFloat(getComputedStyle(el).getPropertyValue(property))
}

export function isPxValue(value) {
  if (isNumber(value)) {
    return true
  }

  if (isString(value)) {
    // 纯数字 或 数字 + px
    return /^\s*-?\d+(\.\d+)?\s*(px)?\s*$/.test(value)
  }

  return false
}

export const border = (el, prop) => {
  return prop === "height"
    ? sumStyle(el, BOX_PROPS.BORDER_Y)
    : sumStyle(el, BOX_PROPS.BORDER_X)
}

export const padding = (el, prop) => {
  return prop === "height"
    ? sumStyle(el, BOX_PROPS.PADDING_Y)
    : sumStyle(el, BOX_PROPS.PADDING_X)
}

export const margin = (el, prop) => {
  return prop === "height"
    ? sumStyle(el, BOX_PROPS.MARGIN_Y)
    : sumStyle(el, BOX_PROPS.MARGIN_X)
}
