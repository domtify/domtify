import type { Domtify } from '@/core/Domtify'

export function toArray(this: Domtify) {
  return Array.from(this)
}
