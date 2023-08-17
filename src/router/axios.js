import axios from 'axios'
import { serialize } from '@/util/util'
import { getStore } from '../util/store'
import NProgress from 'nprogress' // progress bar
import errorCode from '@/const/errorCode'
import router from '@/router/router'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'
import qs from 'qs'
import store from '@/store'
import { baseUrl } from "../config/env"; // progress bar style
axios.defaults.timeout = 30000
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
// NProgress Configuration
NProgress.configure({
  showSpinner: false
})

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  const TENANT_ID = getStore({ name: 'tenantId' })
  const isToken = (config.headers || {}).isToken === false
  const token = store.getters.access_token
  if (token && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + token// token
  }
  if (TENANT_ID) {
    config.headers['TENANT-ID'] = TENANT_ID // 租户ID
  }

  // headers中配置serialize为true开启序列化
  if (config.method === 'post' && config.headers.serialize) {
    config.data = serialize(config.data)
    delete config.data.serialize
  }

  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
  config.url = baseUrl + config.url
  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
axios.interceptors.response.use(res => {
  // debugger
  NProgress.done()
  const status = Number(res.status) || 200
  const message = res.data.msg || errorCode[status] || errorCode['default']
  if (status === 401) {
    Message({
      message: message,
      type: 'error'
    })
    store.dispatch('FedLogOut').then(() => {
      router.push({ path: '/login' })
    })
    return
  }
  let num = res.config.url.indexOf('/admin/chargeorder/export')
  let numAgent = res.config.url.indexOf('/admin/chargeorder/agent/export')
  if (num !== -1 || numAgent !== -1) {
    return res
  }
  if (status !== 200 || res.data.code === 1) {
    Message({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  } else {
    if (res.data.code === 5) {
      Message({
        message: '登陆失效，请重新登陆',
        type: 'error',
        duration: 1500,
        customClass: 'element-error-message-zindex'
      })
      store.dispatch('FedLogOut').then(() => {
        router.push({ path: '/login' })
      })
      return
    }
  }
  if (res && res.data && res.data.data && res.data.data.records) {
    res.data.data.total = Number(res.data.data.total)
    res.data.data.size = Number(res.data.data.size)
    res.data.data.pages = Number(res.data.data.pages)
    res.data.data.current = Number(res.data.data.current)
  }
  return res.data.data
}, error => {
  NProgress.done()
  return Promise.reject(new Error(error))
})

export default axios
