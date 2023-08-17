

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/article/class/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/article/class/save',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/article/class/info/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/article/class/del/' + id,
    method: 'post'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/article/class/edit',
    method: 'post',
    data: obj
  })
}
