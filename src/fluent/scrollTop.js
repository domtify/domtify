import { scrollTo } from '@/helpers/scrollTo.js'

export const scrollTop = value => els => scrollTo(els, value, 'top')
