import { fn } from "@/core.js"

import "./toArray.js"

fn.serialize = function () {
  const params = new URLSearchParams()
  for (const [, element] of this.toArray().entries()) {
    if (element.tagName === "FORM") {
      const fd = new FormData(element)
      for (const [key, value] of fd.entries()) {
        params.append(key, value)
      }
    }
  }

  return params.toString()
}
