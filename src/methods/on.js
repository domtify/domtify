import Event from "@/event/event.js"

export const on =
  (...args) =>
  (els) => {
    new Event(els).on(...args)
    return els
  }
