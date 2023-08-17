

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/file/info/page',
    method: 'get',
    params: query
  })
}
export function fetchSonList (query) {
  return request({
    url: '/admin/file/info/sonPage',
    method: 'get',
    params: query
  })
}
export function addObj (obj) {
  return request({
    url: '/admin/file/info/upload/file',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/file/info/info/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/file/info/del/' + id,
    method: 'post'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/dogcomfileinfo',
    method: 'post',
    data: obj
  })
}
