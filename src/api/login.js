
import request from '@/router/axios'
import qs from 'qs'

const scope = 'server'

export const loginByUsername = (username, password, code, randomStr) => {
  let grant_type = 'password'
  let dataObj = qs.stringify({ 'username': username, 'password': password })

  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { randomStr, code, grant_type },
    data: dataObj
  })
}

export const refreshToken = (refresh_token) => {
  const grant_type = 'refresh_token'
  return request({
    url: '/auth/oauth/token',
    headers: {
      'isToken': false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { refresh_token, grant_type, scope }
  })
}

export const loginByMobile = (mobile, code) => {
  const grant_type = 'mobile'
  return request({
    url: '/auth/mobile/token/sms',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { mobile: 'SMS@' + mobile, code: code, grant_type }
  })
}

export const loginBySocial = (state, code) => {
  const grant_type = 'mobile'
  return request({
    url: '/auth/mobile/token/social',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { mobile: state + '@' + code, grant_type }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/sys/user/info',
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: '/sys/logout',
    method: 'post',
    data: ''
  })
}

export function login (data) {
  return request({
    url: '/login?grant_type=admin',
    method: 'post',
    data: data
  })
  // return httpRequest({
  //   url: httpRequest.adornUrl('/login?grant_type=admin'),
  //   method: 'post',
  //   data: httpRequest.adornData(data)
  // })
}
// 获取验证码图片
export function verificationCode (query) {
  return request({
    url: '/sys/code',
    method: 'get',
    params: {
      randomStr: query
    }
  })
  // return httpRequest({
  //   url: httpRequest.adornUrl('/code'),
  //   method: 'get',
  //   params: {
  //     randomStr: query
  //   }
  // })
}
// 验证码校验
export function validateCodeHandler (query) {
  return request({
    url: '/ValidateCode',
    method: 'get',
    params: query
  })
  // return httpRequest({
  //   url: httpRequest.adornUrl('/ValidateCode'),
  //   method: 'get',
  //   params: query
  // })
}
