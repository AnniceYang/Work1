import request from '@/router/axios'

// 模式管理  查询
export function qryModel(query) {
  return request({
    url: '/admin/lsypattern/page',
    method: 'get',
    params: query
  })
}

// 模式管理  查询详情
export function qryModelInfo(query) {
  return request({
    url: '/admin/lsypattern/info',
    method: 'get',
    params: query
  })
}

// 修改
export function editModel(data) {
  return request({
    url: '/admin/lsypattern/edit',
    method: 'post',
    data
  })
}

// 新增
export function addModel(data) {
  return request({
    url: '/admin/lsypattern/save',
    method: 'post',
    data
  })
}

// 通过id删除
export function delModel(data) {
  return request({
    url: '/admin/lsypattern/del',
    method: 'post',
    data
  })
}