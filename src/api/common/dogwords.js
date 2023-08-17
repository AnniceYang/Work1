import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/dogwords/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/dogwords',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dogwords/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/dogwords/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/dogwords',
    method: 'put',
    data: obj
  })
}

export function refresh() {
  return request({
    url: '/admin/dogwords/refresh',
    method: 'put'
  })
}

export function nouse(id) {
  return request({
    url: '/admin/dogwords/nouse/' + id,
    method: 'put'
  })
}
