

import request from '@/router/axios'

export function qryBanner (query) {
  return request({
    url: '/admin/banner/page',
    method: 'get',
    params: query
  })
}

export function addBanner (data) {
  return request({
    url: '/admin/banner/save',
    method: 'post',
    data
  })
}

export function delBanner (data) {
  return request({
    url: '/admin/banner/del',
    method: 'post',
    data
  })
}

export function editBanner (data) {
  return request({
    url: '/admin/banner/edit',
    method: 'post',
    data
  })
}
// 分类列表
export function qryGenusIdList (query) {
  return request({
    url: '/admin/banner/genus/page',
    method: 'get',
    params: query
  })
}
