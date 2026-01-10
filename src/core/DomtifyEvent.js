//  默认选项
const DEFAULTS = {
  // 是否冒泡
  bubbles: null,
  // 是否能取消
  cancelable: false,
  // 是否会在影子 DOM 根节点之外触发侦听器
  composed: false,
}

class DomtifyEvent extends CustomEvent {
  constructor(name, detail, options = {}) {
    const mergedOptions = {
      ...DEFAULTS,
      ...options,
      detail,
    }

    // 保持和jQuery一致,实际上jquery的trigger方法也只是对这两个类型的事件进行是否冒泡处理
    const noBubbleEvents = new Set(["load", "focus"])

    // 如果用户没设置 bubbles，就用默认判断
    mergedOptions.bubbles = mergedOptions.bubbles ?? !noBubbleEvents.has(name)

    super(name, mergedOptions)
  }
}

DomtifyEvent.DEFAULTS = DEFAULTS

export default DomtifyEvent
