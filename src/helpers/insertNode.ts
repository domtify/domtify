import { isFunction, isInstanceOf } from 'is-what'
import { CACHE_INSERT_STATIC_KEY } from '@/core/constant'
import { flatElements } from './flatElements'
import { isHtmlString } from './isHtmlString'

export type Insertable = Node | string | NodeList | HTMLCollection

export type InsertContent =
  | Insertable
  | Insertable[]
  | ReadonlyArray<Insertable>

export type InsertCallback<T extends Element = Element> = (
  element: T,
  index: number,
  html: string,
) => InsertContent | InsertContent[]

export type InsertContents<T extends Element = Element> =
  | InsertContent[]
  | [InsertCallback<T>]

export type InsertPosition = Parameters<Element['insertAdjacentElement']>[0]

export function insertNode<T extends Element = Element>(
  targets: T[],
  content: InsertContents<T>,
  position: InsertPosition,
  reverse: boolean = true,
): T[] {
  const firstArg = content.at(0)
  const cache = new Map<number | symbol, Insertable[]>()

  // 先缓存要插入的节点
  if (isFunction(firstArg)) {
    for (const [index, element] of targets.entries()) {
      const result = firstArg(element, index, element.innerHTML)
      const nodes = flatElements<Insertable>(result)
      cache.set(index, reverse ? nodes.reverse() : nodes)
    }
  } else {
    const nodes = flatElements<Insertable>(content)
    cache.set(CACHE_INSERT_STATIC_KEY, reverse ? nodes.reverse() : nodes)
  }

  // 第二次遍历，真正插入
  for (const [index, element] of targets.entries()) {
    if (!(element instanceof Node)) continue

    const nodes = isFunction(firstArg)
      ? cache.get(index)
      : cache.get(CACHE_INSERT_STATIC_KEY)

    for (const node of nodes!) {
      if (isHtmlString(node)) {
        element.insertAdjacentHTML(position, node)
      } else if (node instanceof Element) {
        if (element === node) continue
        element.insertAdjacentElement(
          position,
          index === targets.length - 1
            ? node
            : (node.cloneNode(true) as Element),
        )
      } else {
        element.insertAdjacentText(position, String(node))
      }
    }
  }
  return targets
}
