

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/sms/log/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/dogsmslog',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/sms/log/info/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/admin/sms/log/del/' + id,
    method: 'post'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/dogsmslog',
    method: 'post',
    data: obj
  })
}
