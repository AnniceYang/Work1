import 'babel-polyfill'
import 'classlist-polyfill'
import Vue from 'vue'
import axios from './router/axios'
import VueAxios from 'vue-axios'
import App from './App'
import './permission' // 权限
import './error' // 日志
import './cache'//页面缓冲
import router from './router/router'
import store from './store'
import { loadStyle } from './util/util'
import * as urls from '@/config/env'
import { iconfontUrl, iconfontVersion } from '@/config/env'
import * as filters from './filters' // 全局filter
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/common.scss'
import AvueFormDesign from '@sscfaith/avue-form-design'
import basicContainer from './components/basic-container/main'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import Cookies from 'js-cookie'
import i18n from './lang' // internationalization
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 全局混入图片加载错误
import failImg from '@/mixins/failImg.js'
Vue.mixin(failImg)

// import VueAMap from 'vue-amap'
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: 'd854a05d714fa0580a7d22c8f5880459',
//   plugin: ['AMap.Autocomplete', 'AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   v: '1.4.4',
//   uiVersion: '1.0'
// })

// 插件 json 展示
Vue.use(router)

Vue.use(AvueFormDesign);

window.axios = axios
Vue.use(VueAxios, axios)

Vue.use(ElementUI, {
  size: 'small',
  menuType: 'text'
})

Vue.use(Avue, {
  size: 'small',
  menuType: 'text'
})

// 注册全局容器
Vue.component('basicContainer', basicContainer)

// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

// 加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
