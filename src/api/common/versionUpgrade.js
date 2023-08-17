import request from '@/router/axios'

// 查询版本信息
export function getVersioninfo(query) {
  return request({
    url: '/admin/app/version/page',
    method: 'get',
    params: query
  })
}

// 根据id版本信息
export function getVersioninfoId(query) {
  return request({
    url: '/admin/app/version/info',
    params: query,
    method: 'get'
  })
}

// 添加版本信息
export function AddVersioninfo(data) {
  return request({
    url: '/admin/app/version/save',
    method: 'post',
    data
  })
}

// 删除版本信息
export function delVersioninfo(data) {
  return request({
    url: '/admin/app/version/del',
    method: 'post',
    data
  })
}