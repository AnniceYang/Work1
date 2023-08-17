import request from '@/router/axios'

// 升级信息  查询
export function qryUpdate(query) {
  return request({
    url: '/admin/lsyupgrade/page',
    method: 'get',
    params: query
  })
}

// 下发
export function sendUpdate(data) {
  return request({
    url: '/admin/lsyupgrade/issued',
    method: 'post',
    data
  })
}

// 新增
export function addUpdate(data) {
  return request({
    url: '/admin/lsyupgrade/save',
    method: 'post',
    data
  })
}