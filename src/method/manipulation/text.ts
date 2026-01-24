import { isFunction, isUndefined } from 'is-what'
import type {
  Context,
  ContextUnit,
  PipeOperator,
  TerminalOperator,
} from '@/types'

export type TextInput =
  | string
  | number
  | boolean
  | ((el: ContextUnit, index: number, oldText: string | null) => string)

export function text(): TerminalOperator<string>
export function text(value: TextInput): PipeOperator
export function text(value?: TextInput) {
  return (els: Context) => {
    // Getter
    if (isUndefined(value)) {
      return els.map(el => el.textContent).join('')
    }

    // Setter
    for (const [index, el] of els.entries()) {
      const nextText = isFunction(value)
        ? value(el, index, (el as Node).textContent)
        : value
      el.textContent = String(nextText)
    }

    return els
  }
}
