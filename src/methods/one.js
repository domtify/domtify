import Event from "@/event/event.js"

export const one =
  (...args) =>
  (els) => {
    new Event(els).one(...args)
    return els
  }
