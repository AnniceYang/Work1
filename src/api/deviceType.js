import request from '@/router/axios'

// 设备型号管理  查询
export function qryDeviceType(query) {
  return request({
    url: '/admin/lsydevicemodel/page',
    method: 'get',
    params: query
  })
}

// 修改
export function editDeviceType(data) {
  return request({
    url: '/admin/lsydevicemodel/edit',
    method: 'post',
    data
  })
}

// 新增
export function addDeviceType(data) {
  return request({
    url: '/admin/lsydevicemodel/save',
    method: 'post',
    data
  })
}

// 通过id删除
export function delDeviceType(data) {
  return request({
    url: '/admin/lsydevicemodel/del',
    method: 'post',
    data
  })
}