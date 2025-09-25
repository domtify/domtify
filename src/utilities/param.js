import {
  isInstanceOf,
  isNull,
  isUndefined,
  isArray,
  isFunction,
  isAnyObject,
} from "is-what"
import { Domtify, domtify } from "@/core.js"

import "./each.js"

domtify.param = function (obj, traditional = false) {
  if (isInvalidValue(obj)) return ""

  const params = []
  const add = (key, value) => {
    value = isFunction(value) ? value() : value
    if (isInvalidValue(value)) value = ""
    params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  }

  if (isArray(obj) || isInstanceOf(obj, Domtify)) {
    domtify.each(obj, function () {
      add(this?.name, this?.value)
    })
  } else {
    for (const [prefix, value] of Object.entries(obj)) {
      buildParams(prefix, value, traditional, add)
    }
  }

  return params.join("&")
}

function isInvalidValue(value) {
  return isUndefined(value) || isNull(value)
}

function buildParams(prefix, obj, traditional, add) {
  if (isArray(obj)) {
    for (const [index, value] of obj.entries()) {
      if (traditional || prefix.endsWith("[]")) {
        add(prefix, value)
      } else {
        const key = `${prefix}[${isAnyObject(value) ? index : ""}]`
        buildParams(key, value, traditional, add)
      }
    }
  } else if (!traditional && isAnyObject(obj)) {
    for (const [name, value] of Object.entries(obj)) {
      buildParams(`${prefix}[${name}]`, value, traditional, add)
    }
  } else {
    add(prefix, obj)
  }
}
