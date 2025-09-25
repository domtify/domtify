import { domtify } from "@/core.js"

function pushStack(that, elems) {
  // 1. 创建一个新的 jQuery 对象，包含 elems 里的元素
  const d = domtify(elems)
  // 2. 保存当前对象到 prevObject，便于 .end() 回溯
  d.prevObject = that
  // 3. 返回新对象
  return d
}

export { pushStack }
