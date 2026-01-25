import $ from 'jquery'
import { addClass, pipe } from '@/index'

let res
// 一个或者多个空格分割的字符串
// res = $('li').addClass('myClass yourClass')
// res = pipe('li', addClass('myClass yourClass'))

// 支持类名数组
// res = $('li').addClass(['myClass yourClass', 'foo'])
// res = pipe('li', addClass(['myClass yourClass', 'foo']))

// 数组中的边缘情况(它内部会直接把null false都转换成字符串)
// @ts-ignore
// res = $('li').addClass(['myClass yourClass', 'foo', null, false, undefined])
// @ts-ignore
// res = pipe('li', addClass(['myClass yourClass', 'foo', null, false, undefined]))

console.log(res)
