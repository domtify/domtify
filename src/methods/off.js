import Event from "@/event/event.js"

export const off =
  (...args) =>
  (els) => {
    new Event(els).off(...args)
    return els
  }
