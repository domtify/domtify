import { dom } from '@/index'
import { addClass } from '@/method'
import { trace } from '@/method/utilities/trace'

let res = dom('li', addClass('a'), [addClass('b'), trace('aa')], els => {
  return els
})
