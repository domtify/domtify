import Event from '@/core/event.js'

export const one =
  (...args) =>
  els => {
    new Event(els).one(...args)
    return els
  }
