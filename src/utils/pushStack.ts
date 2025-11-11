import { domtify, Domtify, DomtifySelector } from "@/core"

/**
 * 创建一个新的 Domtify 对象，并将当前对象保存为 prevObject。
 * @param that 当前 Domtify 实例（即调用者）
 * @param elems 新的元素选择器或节点集合
 * @returns 一个新的 Domtify 实例，prevObject 指向原实例
 */
function pushStack(that: Domtify, elems: DomtifySelector): Domtify {
  // 1.创建一个新的 Domtify 对象
  const d = domtify(elems)

  // 2.保存当前对象到 prevObject，用于 .end() 回溯
  d.prevObject = that

  // 3.返回新的 Domtify 对象
  return d
}

export { pushStack }
