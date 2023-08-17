

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/config/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/config/save',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/config/info/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/config/del/' + id,
    method: 'post'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/config/edit',
    method: 'post',
    data: obj
  })
}
