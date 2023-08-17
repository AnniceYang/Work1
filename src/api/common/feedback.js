

import request from '@/router/axios'

export function qryFeedback (query) {
  return request({
    url: '/admin/feedback/page',
    method: 'get',
    params: query
  })
}

export function delFeedback (data) {
  return request({
    url: '/admin/feedback/del',
    method: 'post',
    data
  })
}

export function disposeFeedback (data) {
  return request({
    url: '/admin/feedback/handle',
    method: 'post',
    data
  })
}

export function qryFeedbackType (query) {
  return request({
    url: '/admin/comfeedbacktype/page',
    method: 'get',
    params: query
  })
}

export function addFeedbackType (data) {
  return request({
    url: '/admin/comfeedbacktype/save',
    method: 'post',
    data
  })
}

export function editFeedbackType (data) {
  return request({
    url: '/admin/comfeedbacktype/edit',
    method: 'post',
    data
  })
}

export function delFeedbackType (data) {
  return request({
    url: '/admin/comfeedbacktype/del',
    method: 'post',
    data
  })
}