import Event from "@/event/event.js"

export const trigger =
  (...args) =>
  (els) => {
    new Event(els).trigger(...args)
    return els
  }
