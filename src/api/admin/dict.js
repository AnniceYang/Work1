

import request from '@/router/axios'

export function qryDictList(query) {
  return request({
    url: '/sys/dict/page',
    method: 'get',
    params: query
  })
}

export function addDict(data) {
  return request({
    url: '/sys/dict/save',
    method: 'post',
    data: data
  })
}

export function editDict(data) {
  return request({
    url: '/sys/dict/edit',
    method: 'post',
    data: data
  })
}

export function delDict(data) {
  return request({
    url: '/sys/dict/del',
    method: 'post',
    data: data
  })
}

export function qryDictItemList(query) {
  return request({
    url: '/sys/dict/item/page',
    method: 'get',
    params: query
  })
}

export function addDictItem(data) {
  return request({
    url: '/sys/dict/item/save',
    method: 'post',
    data: data
  })
}

export function editDictItem(data) {
  return request({
    url: '/sys/dict/item/edit',
    method: 'post',
    data: data
  })
}

export function delDictItem(data) {
  return request({
    url: '/sys/dict/item/del',
    method: 'post',
    data: data
  })
}

export function qryDictItemData(query) {
  return request({
    url: '/sys/dict/item/list',
    method: 'get',
    params: query
  })
}