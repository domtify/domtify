import { isUndefined, isFunction, isArray } from "is-what"
import { query } from "@/core.js"

export const val = (value) => (els) => {
  if (isUndefined(value)) {
    // getter
    const element = els.at(0)

    if (element.tagName === "SELECT" && element.multiple) {
      // 多选 select特殊情况
      return Array.from(element.selectedOptions).map((opt) => opt.value)
    }

    return element?.value //undefined情况处理
  } else {
    // setter
    for (const [index, element] of els.entries()) {
      let setVal = isFunction(value)
        ? value.call(element, index, val()(query(element)))
        : value

      if (element.tagName == "SELECT") {
        // 下拉框(SELECT)处理逻辑

        // 无论如何都转换成数组
        setVal = isArray(setVal) ? setVal : [setVal]

        for (const option of element.options) {
          option.selected = setVal.includes(option.value)
        }
      } else if (
        ["checkbox", "radio"].includes(element.type) &&
        isArray(setVal)
      ) {
        // 单选框 (Radio) 复选框 (Checkbox)	处理
        element.checked = setVal.includes(element.value)
      } else {
        /**
         * element.value = ["Single"];
         * 其它情况直接赋值,注意，上面它给数组的情况也会正常工作的愿意是内部它自动转换成字符串了
         * 等价于：["Single"].toString() // => "Single"
         * 所以为了更加语义化，我们自己强行转换成字符串
         */
        element.value = String(setVal)
      }
    }

    return els
  }
}
