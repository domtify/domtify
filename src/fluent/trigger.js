import Event from '@/core/event.js'

export const trigger =
  (...args) =>
  els => {
    new Event(els).trigger(...args)
    return els
  }
