import { domtify, fn } from "@/core.js"
import Event from "@/event.js"
import { pushStack } from "@/utils/pushStack.js"

import "./data.js"
import "./toArray.js"

fn.clone = function (withDataAndEvents = false, deepWithDataAndEvents = false) {
  const clones = this.toArray().map((element) => {
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

  return pushStack(this, clones)
}

function copyEventsAndData(source, target) {
  // 复制data属性
  domtify(target).data(domtify(source).data())

  // 复制事件
  new Event(source).cloneTo(target)
}
