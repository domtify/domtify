import Event from '@/core/Event.js'

export const off =
  (...args) =>
  els => {
    new Event(els).off(...args)
    return els
  }
