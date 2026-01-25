import $ from 'jquery'
import { add, pipe } from '@/index'

let res

// css选择器
res = $('li').add('p')
res = pipe('li', add('p'))

// 元素
// @ts-expect-error
res = $('li').add(document.querySelector('p'))
res = pipe('li', add(document.querySelector('p')!))

//html代码片段
res = $('li').add(`<p id='new'>new paragraph</p>`)
res = pipe('li', add(`<p id='new'>new paragraph</p>`))

// jquery对象 = 支持管道
res = $('li').add($('p'))
res = pipe('li', add(pipe('p')))

// 支持第二个参数上下文
const context = document.querySelector('.empty')!
// res = $('li').add('p', context)
res = pipe('li', add('p', context))
console.log(res)
