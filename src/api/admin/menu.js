

import request from '@/router/axios'

export function getMenu (id) {
  return request({
    url: '/sys/menu/menus',
    params: { parentId: id },
    method: 'get'
  })
}

export function getTopMenu () {
  return request({
    url: '/sys/menu/menus',
    params: { type: 'top' },
    method: 'get'
  })
}

export function fetchMenuTree (lazy, parentId) {
  return request({
    url: '/sys/menu/tree',
    method: 'get',
    params: { lazy: lazy, parentId: parentId }
  })
}

export function addObj (obj) {
  return request({
    url: '/sys/menu/save',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/sys/menu/info',
    params: { id },
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/sys/menu/del',
    data: { id },
    method: 'post'
  })
}

export function putObj (obj) {
  return request({
    url: '/sys/menu/edit',
    method: 'post',
    data: obj
  })
}
