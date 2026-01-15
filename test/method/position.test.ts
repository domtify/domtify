import $ from 'jquery'
import { beforeEach, describe, expect, it } from 'vitest'
import { dom } from '@/core/dom'
import { position } from '@/method/position'

describe('position', () => {
  beforeEach(() => {
    const style = document.createElement('style')
    style.textContent = `
      html {
        margin: 100px;
      }
    `
    document.head.appendChild(style)
    document.body.innerHTML = `
    <div class="container0">
      <div class="child" style="display: none"></div>
    </div>

    <div class="container1" style="padding: 10px; margin: 10px">
      <div class="child"></div>
    </div>

    <div
      class="container2"
      style="
        position: relative;
        padding-left: 10px;
        padding-top: 20px;
        margin: 5px;
      "
    >
      <div class="child"></div>
    </div>

    <div class="container3">
      <div
        class="child"
        style="position: fixed; left: 10px; top: 20px; margin: 10px"
      ></div>
    </div>

    <div class="container4">
      <div
        class="child"
        style="position: absolute; left: 10px; top: 20px; margin: 10px"
      ></div>
    </div>

    <div class="container5" style="position: relative; border: 10px solid red">
      <div class="child" style="position: absolute; top: 0; left: 0"></div>
    </div>

    <div
      class="container6"
      style="position: relative; width: 100px; height: 100px; overflow: scroll"
    >
      <div style="width: 300px; height: 300px"></div>
      <div
        class="child"
        style="
          position: absolute;
          top: 50px;
          left: 50px;
          width: 20px;
          height: 20px;
        "
      ></div>
    `
  })

  describe('不存在的集合', () => {
    it('jquery', () => {
      let res
      expect(() => {
        res = $('.not-exist').position()
      }).not.toThrow()
      expect(res).toBeUndefined()
    })
    it('domtify', () => {
      let res
      expect(() => {
        res = position()(dom('.not-exist'))
      }).not.toThrow()
      expect(res).toBeUndefined()
    })
  })

  describe('边缘情况数字', () => {
    // jquery会报错
    it('jquery', () => {
      expect(() => $(10).position()).toThrow(
        "Cannot read properties of undefined (reading 'defaultView')",
      )
    })
    it('domtify', () => {
      const result = position()(dom(10))
      expect(result).toBeUndefined()
    })
  })

  describe('元素不可见', () => {
    it('jquery', () => {
      expect($('.container0 .child').position()).toEqual({
        top: 0,
        left: 0,
      })
    })
    it('domtify', () => {
      expect(position()(dom('.container0 .child'))).toEqual({
        top: 0,
        left: 0,
      })
    })
  })

  describe('不会考虑html标签上的 margin', () => {
    it('jquery', () => {
      expect($('html').position()).toEqual({
        top: 0,
        left: 0,
      })
    })
    it('domtify', () => {
      expect(position()(dom('html'))).toEqual({
        top: 0,
        left: 0,
      })
    })
  })

  describe('子元素相对 static 父容器,会自动找到顶级doc', () => {
    it('jquery', () => {
      expect($('.container1 .child').position()).toEqual({
        top: 120,
        left: 120,
      })
    })
    it('domtify', () => {
      expect(position()(dom('.container1 .child'))).toEqual({
        top: 120,
        left: 120,
      })
    })
  })

  describe('子元素相对 relative 父容器', () => {
    it('jquery', () => {
      const res = $('.container2 .child').position()
      expect(res).toEqual({
        top: 20,
        left: 10,
      })
    })
    it('domtify', () => {
      const res = position()(dom('.container2 .child'))
      expect(res).toEqual({
        top: 20,
        left: 10,
      })
    })
  })

  describe('父容器有边框', () => {
    it('jquery', () => {
      const { top, left } = $('.container5 .child').position()

      expect(top).toBe(0.000006103515630684342)
      expect(left).toBe(-0.0000015258789005656581)
    })
    it('domtify', () => {
      const { top, left } = position()(dom('.container5 .child'))

      expect(top).toBe(0.000006103515630684342)
      expect(left).toBe(-0.0000015258789005656581)
    })
  })

  describe('固定定位', () => {
    it('jquery', () => {
      const res = $('.container3 .child').position()
      expect(res).toEqual({
        top: 20,
        left: 10,
      })
    })
    it('domtify', () => {
      const res = position()(dom('.container3 .child'))
      expect(res).toEqual({
        top: 20,
        left: 10,
      })
    })
  })

  describe('绝对定位', () => {
    it('jquery', () => {
      const res = $('.container4 .child').position()
      expect(res).toEqual({
        top: 20,
        left: 10,
      })
    })
    it('domtify', () => {
      const res = position()(dom('.container4 .child'))
      expect(res).toEqual({
        top: 20,
        left: 10,
      })
    })
  })

  describe('父元素有滚动条', () => {
    it('jquery', () => {
      const parent = document.querySelector('.container6')
      parent.scrollTop = 60
      parent.scrollLeft = 32

      const res = $('.container6 .child').position()
      expect(res).toEqual({
        top: -10,
        left: 18,
      })
    })
    it('domtify', () => {
      const parent = document.querySelector('.container6')
      parent.scrollTop = 60
      parent.scrollLeft = 32

      const res = position()(dom('.container6 .child'))
      expect(res).toEqual({
        top: -10,
        left: 18,
      })
    })
  })
})
