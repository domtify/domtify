import type { Context, Selector } from '@/types'
import { type MaybePromise, type PipeFn, pipe, type SyncPipeFn } from './pipe'
import { query } from './query'

export type DomElement = Element
export type DomArray = DomElement[]

// ① 仅 selector
export function dom(selector: Selector): MaybePromise<DomArray>

/* ================================
 * ② selector + fns
 * ================================ */

// ②-1 同步 fns（必须在前）
export function dom<R = any>(
  selector: Selector,
  fns: SyncPipeFn<DomArray, R>[],
): R

// ②-2 可能 async fns
export function dom<R = any>(
  selector: Selector,
  fns: PipeFn<DomArray, R>[],
): MaybePromise<R>

/* ================================
 * ③ selector + context
 * ================================ */

export function dom(
  selector: Selector,
  context: Context,
): MaybePromise<DomArray>

/* ================================
 * ④ selector + context + fns
 * ================================ */

// ④-1 同步 fns（必须在前）
export function dom<R = any>(
  selector: Selector,
  context: Context,
  fns: SyncPipeFn<DomArray, R>[],
): R

// ④-2 可能 async fns
export function dom<R = any>(
  selector: Selector,
  context: Context,
  fns: PipeFn<DomArray, R>[],
): MaybePromise<R>

export function dom(
  selector: Selector,
  ctxOrFns?: Context | PipeFn[],
  maybeFns?: PipeFn[],
) {
  let ctx: Context | undefined
  let fns: PipeFn[] | undefined

  if (Array.isArray(ctxOrFns)) {
    ctx = undefined
    fns = ctxOrFns
  } else {
    ctx = ctxOrFns
    fns = maybeFns
  }

  const els = query(selector, ctx)

  // ⭐ 没有 fns，直接返回 query 结果
  if (!fns || fns.length === 0) {
    return els
  }

  return pipe(els, ...fns)
}
