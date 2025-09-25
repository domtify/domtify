import { fn } from "@/core.js"
import Event from "@/event.js"

import "./toArray.js"

fn.one = function (...args) {
  new Event(this.toArray()).one(...args)
  return this
}
