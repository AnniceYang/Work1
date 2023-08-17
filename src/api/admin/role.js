

import request from '@/router/axios'

export function roleList () {
  return request({
    url: '/sys/role/roleList',
    method: 'get'
  })
}

export function fetchList (query) {
  return request({
    url: '/sys/role/page',
    method: 'get',
    params: query
  })
}

export function deptRoleList () {
  return request({
    url: '/sys/role/list',
    method: 'get'
  })
}

export function getObj (id) {
  return request({
    url: '/sys/role/' + id,
    method: 'get'
  })
}

export function addObj (obj) {
  return request({
    url: '/sys/role',
    method: 'post',
    data: obj
  })
}

export function putObj (obj) {
  return request({
    url: '/sys/role',
    method: 'post',
    data: obj
  })
}

export function delObj (id) {
  return request({
    url: '/sys/role/' + id,
    method: 'post'
  })
}

export function permissionUpd (roleId, menuIds) {
  return request({
    url: '/sys/role/menu',
    method: 'post',
    data: {
      roleId: roleId,
      menuIds: menuIds
    }
  })
}

export function fetchRoleTree (roleId) {
  return request({
    url: '/sys/menu/role/tree',
    params: { roleId: roleId },
    method: 'get'
  })
}
