import Event from '@/core/event'

export const on =
  (...args) =>
  els => {
    new Event(els).on(...args)
    return els
  }
