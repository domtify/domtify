import { dom } from '@/core/dom'
import Event from '@/core/Event'
import { data } from '@/method/data'
import type { Selector } from '@/types'

export const copyEventsAndData = (source: Selector, target: Selector) => {
  const sourceEls = dom(source)
  const targetEls = dom(target)
  //  从 source 读取 data
  const sourceData = data()(sourceEls)
  //  写入到 target
  data(sourceData)(targetEls)

  // 复制事件
  new Event(source).cloneTo(target)
}
