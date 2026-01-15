import {
  add,
  addClass,
  dom,
  each,
  find,
  first,
  from,
  parent,
  parents,
  trace,
} from '@/index'

console.log(dom('html'))

const res = from('ul')(
  addClass('a'),
  find('li'),
  add(dom('#mycircle')),
  addClass('li-class'),
  parent(),
  first(),
  each((index, el) => {}),
)

console.log(res)
