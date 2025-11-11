import { isInteger, isNull, isUndefined } from "is-what"
import { Domtify, fn } from "@/core.js"
import "./toArray.js"

// 单个 DOM 节点类型
type DomtifyNode = Element | Document

// 一组 DOM 节点
type DomtifyNodeList = Array<DomtifyNode>

declare global {
  interface DomtifyPrototype {
    get(): DomtifyNodeList
    get(index: number): DomtifyNode | undefined
  }
}

function get(this: Domtify): DomtifyNodeList
function get(this: Domtify, index: number): DomtifyNode | undefined
function get(this: Domtify, index?: number) {
  if (isUndefined(index) || isNull(index)) {
    return this.toArray()
  }
  const numIndex = Number(index)
  return isInteger(numIndex) ? this.toArray().at(numIndex) : undefined
}

fn.get = get
