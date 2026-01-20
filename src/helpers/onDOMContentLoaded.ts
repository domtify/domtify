type DomContentLoadedCallback = () => void

const domContentLoadedCallbacks: DomContentLoadedCallback[] = []

export const onDOMContentLoaded = (
  callback: DomContentLoadedCallback,
): void => {
  if (document.readyState === 'loading') {
    // 当文档处于加载状态时，在首次调用时添加监听器
    if (domContentLoadedCallbacks.length === 0) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const cb of domContentLoadedCallbacks) {
          cb()
        }
      })
    }

    domContentLoadedCallbacks.push(callback)
  } else {
    callback()
  }
}
