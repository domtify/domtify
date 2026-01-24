import $ from 'jquery'

import { parent, pipe } from '@/index'

let res

// 不传递选择器
res = $('li.item-a').parent()
res = pipe('li.item-a', parent())

// 查找所有p标签的父级
res = $('p').parent()
res = pipe('p', parent())

//查找所有p标签的带有.selected父级
res = $('p').parent('.selected')
res = pipe('p', parent('.selected'))

// 多个相同父级应该去重
res = $('.child').parent()
res = pipe('.child', parent())

// html选择器则返回一个包含document的合集
res = $('html').parent()
res = pipe('html', parent())

//对于字符串创建的dom应该排除
res = $(`<p>Foo</p>`).parent()
res = pipe('<p>Foo</p>', parent())

console.log(res)
