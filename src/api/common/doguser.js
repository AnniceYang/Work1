

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/user/page',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/user/info/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/user/del/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/user/page',
    method: 'post',
    data: obj
  })
}
export function nouse (id) {
  return request({
    url: '/admin/user/lock/' + id,
    method: 'post'
  })
}

