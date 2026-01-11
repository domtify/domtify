import { describe, it, expect, beforeEach } from 'vitest'

import { dom } from '@/core.js'
import { attr } from '@/methods/attr.js'
import $ from 'jquery'

describe('attr', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="check1" type="checkbox" checked="checked" />
      <label for="check1">check1</label>
      <input id="check2" type="checkbox" />
      <label for="check2">check2</label>
      <p aria-hidden="true">
        Once there was a <em title="huge, gigantic">large</em> dinosaur...
      </p>
      <img id="photo" />
    `
  })

  describe('getter:存在的属性', () => {
    it('jquery', () => {
      expect($('#check1').attr('checked')).toBe('checked')
    })
    it('domtify', () => {
      expect(attr('checked')(dom('#check1'))).toBe('checked')
    })
  })

  describe('getter:不存在的属性返回 undefined', () => {
    it('jquery', () => {
      expect($('#check2').attr('checked')).toBeUndefined()
    })

    it('domtify', () => {
      expect(attr('checked')(dom('#check2'))).toBeUndefined()
    })
  })

  describe('getter:空集合返回 undefined', () => {
    it('jquery', () => {
      expect($('.not-exist').attr('foo')).toBeUndefined()
    })
    it('domtify', () => {
      expect(attr('foo')(dom('.not-exist'))).toBeUndefined()
    })
  })

  describe('setter:设置简单属性', () => {
    it('jquery', () => {
      $('#check1').attr('alt', 'Beijing Brush Seller')
      expect(document.querySelector('#check1').getAttribute('alt')).toBe(
        'Beijing Brush Seller',
      )
    })
    it('jquery', () => {
      attr('alt', 'Beijing Brush Seller')(dom('#check1'))
      expect(document.querySelector('#check1').getAttribute('alt')).toBe(
        'Beijing Brush Seller',
      )
    })
  })

  describe('setter:设置null删除属性', () => {
    it('jquery', () => {
      $('#check1').attr('checked', null)
      expect(document.querySelector('#check1').hasAttribute('checked')).toBe(
        false,
      )
    })
    it('domtify', () => {
      attr('checked', null)(dom('#check1'))
      expect(document.querySelector('#check1').hasAttribute('checked')).toBe(
        false,
      )
    })
  })

  describe('setter:设置false删除属性', () => {
    it('jquery', () => {
      $('#check1').attr('checked', false)
      expect(document.querySelector('#check1').hasAttribute('checked')).toBe(
        false,
      )
    })
    it('domtify', () => {
      attr('checked', false)(dom('#check1'))
      expect(document.querySelector('#check1').hasAttribute('checked')).toBe(
        false,
      )
    })
  })

  describe('setter:设置false也无法删除aria属性', () => {
    it('jquery', () => {
      $('p').attr('aria-hidden', false)
      expect(document.querySelector('p').getAttribute('aria-hidden')).toBe(
        'false',
      )
    })
    it('domtify', () => {
      attr('aria-hidden', false)(dom('p'))
      expect(document.querySelector('p').getAttribute('aria-hidden')).toBe(
        'false',
      )
    })
  })

  describe('setter:函数', () => {
    it('jquery', () => {
      $('em').attr('title', (i, val) => val + '-' + i)
      expect(document.querySelector('em').getAttribute('title')).toBe(
        'huge, gigantic-0',
      )
    })
    it('domtify', () => {
      attr('title', (i, val) => val + '-' + i)(dom('em'))
      expect(document.querySelector('em').getAttribute('title')).toBe(
        'huge, gigantic-0',
      )
    })
  })

  describe('setter:对象', () => {
    it('jquery', () => {
      $('img').attr({ title: 'domtify', alt: 'domtify Logo' })
      const img = document.querySelector('img')
      expect(img.getAttribute('title')).toBe('domtify')
      expect(img.getAttribute('alt')).toBe('domtify Logo')
    })
    it('domtify', () => {
      attr({ title: 'domtify', alt: 'domtify Logo' })(dom('img'))
      const img = document.querySelector('img')
      expect(img.getAttribute('title')).toBe('domtify')
      expect(img.getAttribute('alt')).toBe('domtify Logo')
    })
  })

  describe('setter:空集合不报错', () => {
    it('jquery', () => {
      expect(() => $('.not-exist').attr('foo', 'bar')).not.toThrow()
    })
    it('domtify', () => {
      expect(() => attr('foo', 'bar')(dom('.not-exist'))).not.toThrow()
    })
  })
})
