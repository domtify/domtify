import { copyEventsAndData } from '@/helpers/copyEventsAndData'

export const clone =
  (withDataAndEvents = false, deepWithDataAndEvents = false) =>
  els => {
    return els.map(element => {
      const clone = element.cloneNode(true)

      if (withDataAndEvents === true) {
        // 复制当前元素上的事件和数据
        copyEventsAndData(element, clone)

        if (deepWithDataAndEvents) {
          // 递归复制子元素的事件和数据
          const origDesc = element.querySelectorAll('*')
          const cloneDesc = clone.querySelectorAll('*')

          for (const [index, node] of origDesc.entries()) {
            copyEventsAndData(node, cloneDesc[index])
          }
        }
      }

      return clone
    })
  }
