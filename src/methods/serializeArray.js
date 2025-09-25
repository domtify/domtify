import { fn } from "@/core.js"

import "./toArray.js"

fn.serializeArray = function () {
  const params = []

  for (const [, element] of this.toArray().entries()) {
    if (element.tagName === "FORM") {
      const fd = new FormData(element)
      for (const [key, value] of fd.entries()) {
        params.push({ name: key, value })
      }
    }
  }

  return params
}
