

import request from '@/router/axios'

// 分页常见问题列表
export function qryProblem (query) {
  return request({
    url: '/admin/common/problem/page',
    method: 'get',
    params: query
  })
}
// 添加
export function addProblem (data) {
  return request({
    url: '/admin/common/problem/save',
    method: 'post',
    data
  })
}
// 修改
export function editProblem (data) {
  return request({
    url: '/admin/common/problem/edit',
    method: 'post',
    data
  })
}
// 删除
export function delProblem (data) {
  return request({
    url: '/admin/common/problem/del',
    method: 'post',
    data
  })
}


// 分页常见问题分类列表
export function qryProblemClassify (query) {
  return request({
    url: '/admin/common/problem/class/page',
    method: 'get',
    params: query
  })
}
// 添加
export function addProblemClassify (data) {
  return request({
    url: '/admin/common/problem/class/save',
    method: 'post',
    data
  })
}
// 修改
export function editProblemClassify (data) {
  return request({
    url: '/admin/common/problem/class/edit',
    method: 'post',
    data
  })
}
// 删除
export function delProblemClassify (data) {
  return request({
    url: '/admin/common/problem/class/del',
    method: 'post',
    data
  })
}
