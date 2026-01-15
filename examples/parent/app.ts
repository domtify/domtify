import $ from 'jquery'

import { dom, parent, pipe, text } from '@/index'

let res

// 不传递选择器
res = $('li.item-a').parent()

let res3 = dom<[]>('li.item-a', [
  parent(),
  els => {
    console.log(els)
    return els
  },
])

// // 查找所有p标签的父级
// res = $('p').parent()
// res = dom('p', [parent()])

// //对于字符串创建的dom应该排除
// res = $(`<p>Foo</p>`).parent()
// res = dom('<p>Foo</p>', [parent()])

console.log(res)
