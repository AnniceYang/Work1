import request from '@/router/axios'

// 地址管理  查询
export function qryAddress(query) {
  return request({
    url: '/admin/lsyregion/page',
    method: 'get',
    params: query
  })
}

// 修改
export function editAddress(data) {
  return request({
    url: '/admin/lsyregion/edit',
    method: 'post',
    data
  })
}

// 新增
export function addAddress(data) {
  return request({
    url: '/admin/lsyregion/save',
    method: 'post',
    data
  })
}

// 通过id删除
export function delAddress(data) {
  return request({
    url: '/admin/lsyregion/del',
    method: 'post',
    data
  })
}
