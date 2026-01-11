import { filter } from './filter.js'

export const is = selector => els => filter(selector)(els).length > 0
