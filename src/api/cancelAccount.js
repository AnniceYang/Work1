import request from '@/router/axios'

// 注销账户列表 查询
export function qryCancelRecord (query) {
  return request({
    url: '/admin/user/logout/page',
    method: 'get',
    params: query
  })
}

// 注销账户审核
export function checkCancelRecord (data) {
  return request({
    url: '/admin/user/logout/review',
    method: 'post',
    data
  })
}

// 注销账户删除
export function delCancelRecord (data) {
  return request({
    url: '/admin/user/logout/del',
    method: 'post',
    data
  })
}