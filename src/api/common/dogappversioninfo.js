

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/app/version/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/app/version/save',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/app/version/info/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/app/version/del/' + id,
    method: 'post'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/dogappversioninfo',
    method: 'put',
    data: obj
  })
}
