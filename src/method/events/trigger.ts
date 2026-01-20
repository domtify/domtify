import Event from '@/core/event'

export const trigger =
  (...args) =>
  els => {
    new Event(els).trigger(...args)
    return els
  }
