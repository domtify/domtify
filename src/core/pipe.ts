import { select } from '@/helpers/select'
import type {
  Context,
  ContextUnit,
  OperatorInput,
  PipeOperator,
  Selector,
  SelectorContext,
  TerminalOperator,
} from '@/types'

export function pipe(selector: () => void): void
export function pipe<T = ContextUnit>(
  selector: Exclude<Selector, Function>,
  ...operators: OperatorInput[]
): T[]
export function pipe<R>(
  selector: Exclude<Selector, Function>,
  ...operators: [...OperatorInput[], TerminalOperator<R>]
): R
export function pipe<T = ContextUnit>(
  selector: Exclude<Selector, Function>,
  context: SelectorContext,
  ...operators: OperatorInput[]
): T[]

export function pipe<R>(
  selector: Exclude<Selector, Function>,
  context: SelectorContext,
  ...operators: [...OperatorInput[], TerminalOperator<R>]
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

function flattenOperators(input: OperatorInput[], result: PipeOperator[] = []) {
  for (const item of input) {
    if (Array.isArray(item)) {
      flattenOperators(item, result)
    } else if (typeof item === 'function') {
      result.push(item)
    }
  }
  return result
}
