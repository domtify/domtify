import { d } from '@/index'
import { addClass } from '@/method'

d.fn.extend({ addClass })

let res = d('li').addClass('dsadaa')

console.log(res)
