import {
  isFunction,
  isInstanceOf,
  isArray,
  isString,
  isUndefined,
} from "is-what"

// 把 className 转成数组
function resolveClasses(element, index, className, extraArg) {
  let classes

  if (isFunction(className)) {
    classes = Reflect.apply(className, element, [
      index,
      isInstanceOf(element, Element) ? element.classList.value : "",
      extraArg, // toggleClass 用到 state
    ])
  } else if (isUndefined(className)) {
    classes = element.classList.value
  } else {
    classes = className
  }

  if (isArray(classes)) {
    classes = classes.flatMap((item) => String(item).split(" "))
  } else if (isString(classes)) {
    classes = classes.split(" ")
  } else {
    classes = []
  }

  return classes
}

// 工厂函数：生成 add/remove/toggle 方法
function classList(method) {
  return function (className, state) {
    for (const [index, element] of this.toArray().entries()) {
      if (!isInstanceOf(element, Element)) continue

      const classes = resolveClasses(element, index, className, state)

      if (method === "toggle") {
        for (const c of classes) {
          element.classList.toggle(c, state)
        }
      } else {
        element.classList[method](...classes)
      }
    }
    return this
  }
}

export { classList }
