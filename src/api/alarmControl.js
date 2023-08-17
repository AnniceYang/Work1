import request from '@/router/axios'

// 告警控制  查询
export function qryAlarmControl(query) {
  return request({
    url: '/admin/lsyalarmcontrol/page',
    method: 'get',
    params: query
  })
}

// 修改
export function editAlarmControl(data) {
  return request({
    url: '/admin/lsyalarmcontrol/edit',
    method: 'post',
    data
  })
}

// 新增
export function addAlarmControl(data) {
  return request({
    url: '/admin/lsyalarmcontrol/save',
    method: 'post',
    data
  })
}

// 通过id删除
export function delAlarmControl(data) {
  return request({
    url: '/admin/lsyalarmcontrol/del',
    method: 'post',
    data
  })
}
