import request from '@/router/axios'

// 资料中心管理  查询
export function qryDataCenter(query) {
  return request({
    url: '/admin/lsydatacenter/page',
    method: 'get',
    params: query
  })
}

// 修改
export function editDataCenter(data) {
  return request({
    url: '/admin/lsydatacenter/edit',
    method: 'post',
    data
  })
}

// 新增
export function addDataCenter(data) {
  return request({
    url: '/admin/lsydatacenter/save',
    method: 'post',
    data
  })
}

// 通过id删除
export function delDataCenter(data) {
  return request({
    url: '/admin/lsydatacenter/del',
    method: 'post',
    data
  })
}