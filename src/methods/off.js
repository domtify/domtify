import { fn } from "@/core.js"
import Event from "@/event.js"

import "./toArray.js"

fn.off = function (...args) {
  new Event(this.toArray()).off(...args)
  return this
}
