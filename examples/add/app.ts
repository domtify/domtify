import $ from 'jquery'

import { parent, pipe } from '@/index'

let res

// css选择器
// res = $('li').add('p')

// 元素
// res = $('li').add(document.querySelector('p'))

const textNode = document.createTextNode('Hello World')

// console.log(textNode instanceof Node)

res = $('li').add(textNode)

console.log(res)
