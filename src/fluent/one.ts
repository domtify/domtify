import Event from '@/core/event'

export const one =
  (...args) =>
  els => {
    new Event(els).one(...args)
    return els
  }
