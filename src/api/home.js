import request from '@/router/axios'

// 首页查询(头)
export function qryHomeTop(query) {
  return request({
    url: '/admin/index/one',
    method: 'get',
    params: query
  })
}

// 商家交易数据
export function qryHomeDeal(query) {
  return request({
    url: '/admin/index/four',
    method: 'get',
    params: query
  })
}

// 运营统计折线图
export function qryHomeStatistic(query) {
  return request({
    url: '/admin/index/three',
    method: 'get',
    params: query
  })
}

// 首页(运营统计)查询
export function qryHomeStatisticList(query) {
  return request({
    url: '/admin/index/two',
    method: 'get',
    params: query
  })
}