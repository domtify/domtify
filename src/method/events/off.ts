import Event from '@/core/Event'

export const off =
  (...args) =>
  els => {
    new Event(els).off(...args)
    return els
  }
