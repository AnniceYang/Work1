

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/guide/page/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/guide/page/save',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/guide/page/info/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/guide/page/del/' + id,
    method: 'post'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/guide/page/edit',
    method: 'post',
    data: obj
  })
}
