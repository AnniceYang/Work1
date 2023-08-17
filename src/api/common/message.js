import request from '@/router/axios'

export function qryMessage (query) {
  return request({
    url: '/admin/news/page',
    method: 'get',
    params: query
  })
}

export function addMessage (obj) {
  return request({
    url: '/admin/news/save',
    method: 'post',
    data: obj
  })
}

export function editMessage (obj) {
  return request({
    url: '/admin/news/edit',
    method: 'post',
    data: obj
  })
}

export function delMessage (data) {
  return request({
    url: '/admin/news/del',
    method: 'post',
    data
  })
}

export function getMessageNum () {
  return request({
    url: '/admin/news/num',
    method: 'get'
  })
}