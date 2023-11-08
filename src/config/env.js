
// 配置编译环境和线上环境之间的切换

const env = process.env
let baseUrl = ''
let baseMqtt = ''
// 图表库为avue和pig2套地址
const iconfontVersion = ['667895_v7uduh4zui', '1638883_qi08jij1ln', '1665889_to4cddc4s3i', '2627385_oo61mipl1qr']
const iconfontUrl = '//at.alicdn.com/t/font_$key.css'
const codeUrl = `${window.location.origin}/code`

const isResetPasswords = true // 是否首次登陆重置密码

const actUrl = `${window.location.origin}/act/modeler.html?modelId=`
if (env.NODE_ENV === 'development') {
  // baseUrl = 'http://pubtest.esysunhome.com:7072'
  // baseMqtt = 'tcp://pubtest.esysunhome.com:8083/mqtt'
  baseUrl = 'http://120.79.138.205:7072'
  baseMqtt = 'tcp://120.79.138.205:8083/mqtt'
  // baseUrl = 'https://esybackend.esysunhome.com:7072'
  // baseMqtt = 'wss://abroadtcp.esysunhome.com:8084/mqtt'  //力胜源
  // baseUrl = 'https://pubbackend.esysunhome.com:7072'
  // baseMqtt = 'wss://pubtcp.esysunhome.com:8084/mqtt'  //公版
} else if (env.NODE_ENV === 'production') {
  // baseUrl = 'http://120.79.138.205:7072'
  // baseMqtt = 'tcp://120.79.138.205:8083/mqtt'  //测试
  // baseUrl = 'https://pubbackend.esysunhome.com:7072'
  // baseMqtt = 'wss://pubtcp.esysunhome.com:8084/mqtt'  //公版
  // baseUrl = 'http://pubtest.esysunhome.com:7072'
  // baseMqtt = 'tcp://pubtest.esysunhome.com:8083/mqtt'
  baseUrl = 'https://esybackend.esysunhome.com:7072'
  baseMqtt = 'wss://abroadtcp.esysunhome.com:8084/mqtt'  //力胜源
}
export {
  isResetPasswords,
  baseUrl,
  actUrl,
  baseMqtt,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env
}
