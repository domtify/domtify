import Event from '@/core/event.js'

export const on =
  (...args) =>
  els => {
    new Event(els).on(...args)
    return els
  }
