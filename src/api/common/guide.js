import request from '@/router/axios'

export function qryGuide (query) {
  return request({
    url: '/admin/guide/page/page',
    method: 'get',
    params: query
  })
}

export function addGuide (obj) {
  return request({
    url: '/admin/guide/page/save',
    method: 'post',
    data: obj
  })
}

export function editGuide (obj) {
  return request({
    url: '/admin/guide/page/edit',
    method: 'post',
    data: obj
  })
}

export function delGuide (data) {
  return request({
    url: '/admin/guide/page/del',
    method: 'post',
    data
  })
}