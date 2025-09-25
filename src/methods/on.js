import { fn } from "@/core.js"
import Event from "@/event.js"

import "./toArray.js"

fn.on = function (...args) {
  console.log(this.toArray())

  new Event(this.toArray()).on(...args)
  return this
}
