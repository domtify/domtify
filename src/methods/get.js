import { isInteger, isNull, isUndefined } from "is-what"
import { fn } from "@/core.js"

import "./toArray.js"

fn.get = function (index) {
  let result

  if (isUndefined(index) || isNull(index)) {
    result = this.toArray()
  } else {
    index = Number(index)

    result = isInteger(index) ? this.toArray().at(index) : undefined
  }

  return result
}
