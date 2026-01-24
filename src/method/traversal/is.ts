import { filter } from '@/method'

export const is = selector => els => filter(selector)(els).length > 0
