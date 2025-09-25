import { isUndefined } from "is-what"
import { domtify } from "@/core.js"

// 默认配置
const DEFAULT = {
  leading: false, // 是否在延迟开始时立即调用
  trailing: true, // 是否在延迟结束时调用
  maxWait: undefined, // 最大等待时间（保证一定时间内至少调用一次）
}

domtify.debounce = function (fn, wait = 0, options = {}) {
  let timerId // 定时器 id
  let lastArgs // 最近一次调用的参数
  let lastThis // 最近一次调用的 this
  let result // fn 的返回值

  let lastCallTime // 最近一次调用的时间戳
  let lastInvokeTime = 0 // 最近一次真正执行 fn 的时间戳
  const { leading, trailing, maxWait } = { ...DEFAULT, ...options }
  const maxing = !isUndefined(maxWait) // 是否启用最大等待时间逻辑

  const now = () => Date.now()

  // 真正执行 fn
  const invokeFunc = (time) => {
    lastInvokeTime = time
    const res = Reflect.apply(fn, lastThis, lastArgs)
    lastArgs = lastThis = undefined // 执行后清空上下文
    result = res
    return res
  }

  // 启动定时器
  const startTimer = (pending) => {
    timerId = setTimeout(timerExpired, pending)
  }

  // 处理 leading: true 的情况（立即执行一次）
  const leadingEdge = (time) => {
    lastInvokeTime = time
    startTimer(wait) // 开启定时器，等待 trailing 调用
    return leading ? invokeFunc(time) : result
  }

  // 计算剩余等待时间
  const remainingWait = (time) => {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    // 如果开启了 maxWait，需要保证不超过 maxWait
    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  // 判断当前是否应该调用 fn
  const shouldInvoke = (time) => {
    if (isUndefined(lastCallTime)) return true // 首次调用
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    return (
      timeSinceLastCall >= wait || // 超过等待时间
      timeSinceLastCall < 0 || // 系统时间被调整导致倒退
      (maxing && timeSinceLastInvoke >= maxWait) // 达到最大等待时间
    )
  }

  // 定时器到期时触发
  function timerExpired() {
    const time = now()
    if (shouldInvoke(time)) {
      // 满足条件 -> 进入 trailing 阶段
      return trailingEdge(time)
    }
    // 否则继续等待
    startTimer(remainingWait(time))
  }

  // 处理 trailing: true 的情况（在延迟结束时调用）
  const trailingEdge = (time) => {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  // 返回的防抖函数
  function debounced(...args) {
    const time = now()
    const isInvoking = shouldInvoke(time)

    // 记录最新一次调用的参数和 this
    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (isUndefined(timerId)) {
        // 如果没有定时器，执行 leadingEdge
        return leadingEdge(time)
      }
      if (maxing) {
        // 如果开启 maxWait，保证定期执行
        const ret = invokeFunc(time)
        startTimer(wait)
        return ret
      }
    }

    // 如果没有定时器，开启一个
    if (isUndefined(timerId)) startTimer(wait)

    return result
  }

  // 手动取消防抖
  debounced.cancel = () => {
    if (!isUndefined(timerId)) clearTimeout(timerId)
    timerId = lastArgs = lastThis = undefined
    lastCallTime = undefined
    lastInvokeTime = 0
  }

  // 立即执行（flush 缓存中的最后一次调用）
  debounced.flush = () => (isUndefined(timerId) ? result : trailingEdge(now()))

  return debounced
}
