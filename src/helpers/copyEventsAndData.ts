import Event from '@/core/Event'
import { data } from '@/method'
import type { Selector } from '@/types'
import { select } from './select'

export const copyEventsAndData = (source: Selector, target: Selector) => {
  const sourceEls = select(source)
  const targetEls = select(target)
  //  从 source 读取 data
  const sourceData = data()(sourceEls)
  //  写入到 target
  data(sourceData)(targetEls)

  // 复制事件
  new Event(source).cloneTo(target)
}
