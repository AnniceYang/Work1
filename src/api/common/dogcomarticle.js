

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/article/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/article/save',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/article/info/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/article/del/' + id,
    method: 'post'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/article/edit',
    method: 'post',
    data: obj
  })
}
export function getClassList (query) {
  return request({
    url: '/admin/article/class/page',
    method: 'get',
    params: query
  })
}
