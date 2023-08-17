/*
 * @Descripttion:
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: liu
 * @Date: 2021-03-09 14:30:18
 * @LastEditors: liu
 * @LastEditTime: 2021-04-06 09:45:13
 * @Update Descripttion:
 */


import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/sys/user/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/sys/user/save',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/sys/user/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/sys/user/del',
    data: { id },
    method: 'post'
  })
}

export function putObj (obj) {
  return request({
    url: '/sys/user/edit',
    method: 'post',
    data: obj
  })
}

export function getDetails (obj) {
  return request({
    url: '/sys/user/details/' + obj,
    method: 'get'
  })
}

// 更改个人信息
export function editInfo (obj) {
  return request({
    url: '/sys/user/edit',
    method: 'post',
    data: obj
  })
}
// 禁用启用
export function nouse (data) {
  return request({
    url: '/sys/user/lock',
    method: 'post',
    data
  })
}
export function handleSfPassword (id) {
  return request({
    url: '/sys/user/sfPassword/' + id,
    method: 'post'
  })
}
// 重置密码
export function editResetPassword (data) {
  return request({
    url: '/sys/user/password/reset',
    method: 'post',
    data
  })
}

// 修改当前用户个人密码
export function editPassword (data) {
  return request({
    url: '/sys/user/password/edit',
    method: 'post',
    data
  })
}