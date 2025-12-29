import { dom } from "@/core.js"
import { data } from "@/methods/data.js"
import Event from "@/event/Event.js"

export const copyEventsAndData = (source, target) => {
  // 复制data属性
  data(data()(dom(source)))(dom(target))

  const sourceEls = dom(source)
  const targetEls = dom(target)
  //  从 source 读取 data
  const sourceData = data()(sourceEls)
  //  写入到 target
  data(sourceData)(targetEls)

  // 复制事件
  new Event(source).cloneTo(target)
}
