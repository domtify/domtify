export type MaybePromise<T> = T | Promise<T>
/**
 * pipe 中的 step：
 * - 输入一定是 array
 * - 输出：
 *   - 中间 step：array | Promise<array>
 *   - 最后 step：any | Promise<any>（TS 层面无法区分，只能运行时校验）
 */
export type PipeFn<I = any[], O = any> = (input: I) => MaybePromise<O>
export type SyncPipeFn<I = any, O = any> = (input: I) => O

export function pipe<T extends any[], R = any>(
  input: MaybePromise<T>,
  ...fns: PipeFn<any, any>[]
): MaybePromise<R> {
  let acc: any = input

  for (const [index, fn] of fns.entries()) {
    const isLast = index === fns.length - 1

    if (acc instanceof Promise) {
      acc = acc.then(res =>
        Promise.resolve(fn(res)).then(v => assertArray(isLast, v, index, fn)),
      )
    } else {
      const result = fn(acc)

      if (result instanceof Promise) {
        acc = result.then(v => assertArray(isLast, v, index, fn))
      } else {
        acc = assertArray(isLast, result, index, fn)
      }
    }
  }

  return acc
}
function assertArray(
  isLast: boolean,
  value: unknown,
  index: number,
  step: Function,
) {
  if (!isLast && !Array.isArray(value)) {
    const fnName = step?.name || 'anonymous'
    const type = Object.prototype.toString.call(value)

    throw new TypeError(
      `[pipe] Step #${index + 1} (${fnName}) expected an array, but got ${type}`,
    )
  }
  return value
}
