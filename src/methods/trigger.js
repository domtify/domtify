import { fn } from "@/core.js"
import Event from "@/event.js"

import "./toArray.js"

fn.trigger = function (...args) {
  new Event(this.toArray()).trigger(...args)
  return this
}
