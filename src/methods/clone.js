import { el } from "@/core.js"
import { data } from "./data.js"
import Event from "@/event/event.js"

const copyEventsAndData = (source, target) => {
  // 复制data属性
  data(data()(el(source)))(el(target))

  // 复制事件
  new Event(source).cloneTo(target)
}

export const clone =
  (withDataAndEvents = false, deepWithDataAndEvents = false) =>
  (els) => {
    return els.map((element) => {
      const clone = element.cloneNode(true)

      if (withDataAndEvents === true) {
        // 复制当前元素上的事件和数据
        copyEventsAndData(element, clone)

        if (deepWithDataAndEvents) {
          // 递归复制子元素的事件和数据
          const origDesc = element.querySelectorAll("*")
          const cloneDesc = clone.querySelectorAll("*")

          for (const [index, node] of origDesc.entries()) {
            copyEventsAndData(node, cloneDesc[index])
          }
        }
      }

      return clone
    })
  }
