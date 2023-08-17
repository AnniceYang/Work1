import request from '@/router/axios'

// 新闻中心管理  查询
export function qryNews(query) {
  return request({
    url: '/admin/lsynews/page',
    method: 'get',
    params: query
  })
}

// 修改
export function editNews(data) {
  return request({
    url: '/admin/lsynews/edit',
    method: 'post',
    data
  })
}

// 新增
export function addNews(data) {
  return request({
    url: '/admin/lsynews/save',
    method: 'post',
    data
  })
}

// 通过id删除
export function delNews(data) {
  return request({
    url: '/admin/lsynews/del',
    method: 'post',
    data
  })
}
