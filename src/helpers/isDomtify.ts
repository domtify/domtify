import type { DomtifyInstance } from '@/types'

export function isDomtify(value: any): value is DomtifyInstance {
  return value && typeof value === 'object' && 'domtify' in value
}
