import { isFunction, isInstanceOf } from 'is-what'
import { CACHE_INSERT_STATIC_KEY } from '@/constants/index'
import { flatElements } from './flatElements'
import { isHtmlString } from './isHtmlString'

/**
 * 通用 DOM 插入助手函数
 * @param {Node[]} targets 要操作的元素列表
 * @param {any[]} content 要插入的内容或生成函数
 * @param {"beforebegin"|"afterbegin"|"beforeend"|"afterend"} position 插入位置
 * @param {boolean} [reverse=true] 是否反转节点顺序（默认为 true）
 */
export const insertNode = (targets, content, position, reverse = true) => {
  const firstArg = content.at(0)
  const cache = new Map()

  // 先缓存要插入的节点
  if (isFunction(firstArg)) {
    for (const [index, element] of targets.entries()) {
      const result = Reflect.apply(firstArg, element, [
        index,
        element.innerHTML,
      ])
      const nodes = flatElements(result)
      cache.set(index, reverse ? nodes.reverse() : nodes)
    }
  } else {
    const nodes = flatElements(content)
    cache.set(CACHE_INSERT_STATIC_KEY, reverse ? nodes.reverse() : nodes)
  }

  // 第二次遍历，真正插入
  for (const [index, element] of targets.entries()) {
    if (!isInstanceOf(element, Node)) continue

    const nodes = isFunction(firstArg)
      ? cache.get(index)
      : cache.get(CACHE_INSERT_STATIC_KEY)

    for (const node of nodes) {
      if (isHtmlString(node)) {
        element.insertAdjacentHTML(position, node)
      } else if (isInstanceOf(node, Node)) {
        if (element === node) return

        element.insertAdjacentElement(
          position,
          index === targets.length - 1 ? node : node.cloneNode(true),
        )
      } else {
        element.insertAdjacentText(position, String(node))
      }
    }
  }

  return targets
}
