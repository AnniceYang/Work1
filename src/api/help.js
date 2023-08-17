import request from '@/router/axios'

// 帮助管理  查询
export function qryHelp(query) {
  return request({
    url: '/admin/chargehelp/page',
    method: 'get',
    params: query
  })
}

// 修改
export function editHelp(data) {
  return request({
    url: '/admin/chargehelp/edit',
    method: 'post',
    data
  })
}

// 新增
export function addHelp(data) {
  return request({
    url: '/admin/chargehelp/save',
    method: 'post',
    data
  })
}

// 通过id删除
export function delHelp(id) {
  return request({
    url: '/admin/chargehelp/' + id,
    method: 'post'
  })
}

// 活动 查询
export function qryActivityList(query) {
  return request({
    url: '/admin/chargeactivity/page',
    method: 'get',
    params: query
  })
}

// 活动 修改
export function editActivityList(data) {
  return request({
    url: '/admin/chargeactivity/edit',
    method: 'post',
    data
  })
}

// 活动 新增活动
export function addActivityList(data) {
  return request({
    url: '/admin/chargeactivity/save',
    method: 'post',
    data
  })
}

// 启用禁用活动
export function setActivityState(id) {
  return request({
    url: '/admin/chargeactivity/status/' + id,
    method: 'post'
  })
}

// 活动 通过id删除
export function delActivity(id) {
  return request({
    url: '/admin/chargeactivity/' + id,
    method: 'post'
  })
}

// 代理商热度查询
export function qryAgentHeat(query) {
  return request({
    url: '/admin/chargeloginlog/agent',
    method: 'get',
    params: query
  })
}

// 代理商热度查询
export function qryHotelHeat(query) {
  return request({
    url: '/admin/chargeloginlog/hotel',
    method: 'get',
    params: query
  })
}

// 热度明细查询
export function qryHeatDetail(query) {
  return request({
    url: '/admin/chargeloginlog/page',
    method: 'get',
    params: query
  })
}