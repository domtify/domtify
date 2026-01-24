import { select } from '@/helpers/select'
import type {
  Context,
  Operator,
  OperatorInput,
  Selector,
  SelectorContext,
  TerminalOperator,
} from '@/types'

export function pipe(fn: () => void): void
// ① 没有 terminal operator → 返回 Context
export function pipe(
  selector: Exclude<Selector, Function>,
  ...operators: OperatorInput[]
): Context

// ② 有 terminal operator → 返回 R
export function pipe<R>(
  selector: Exclude<Selector, Function>,
  ...operatorsAndLast: [...OperatorInput[], TerminalOperator<R>]
): R

export function pipe(
  selector: Exclude<Selector, Function>,
  context: SelectorContext,
  ...operators: OperatorInput[]
): Context

export function pipe<R>(
  selector: Exclude<Selector, Function>,
  context: SelectorContext,
  ...operatorsAndLast: [...OperatorInput[], TerminalOperator<R>]
): R
export function pipe(...args: any[]) {
  const selector = args.shift()
  let context = document

  if (typeof args[0] === 'string' || args[0] instanceof Element) {
    context = args.shift()
  }

  const operators = flattenOperators(args)
  let ctx: any = select(selector, context)

  for (const op of operators) {
    ctx = op(ctx)
  }

  return ctx
}

function flattenOperators(input: OperatorInput[], result: Operator[] = []) {
  for (const item of input) {
    if (Array.isArray(item)) {
      flattenOperators(item, result)
    } else if (typeof item === 'function') {
      result.push(item)
    }
  }
  return result
}
