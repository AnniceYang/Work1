// import store from '@/store'

export default {
  title: '储能整合系统',
  subtitle: '储能',
  copyright: '',
  isFirstPage: true,// 配置首页不可关闭
  key: 'pigx', // 配置主键,目前用于存储
  whiteList: ['/login', '/404', '/401', '/lock'], // 配置无权限可以访问的页面
  whiteTagList: ['/login', '/404', '/401', '/lock'], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  fistPage: {
    label: '首页',
    value: '/wel/index',
    params: {},
    query: {},
    group: [],
    close: false
  },
  // 配置菜单的属性
  menu: {
    props: {
      // label: store.state.common.language === 'en-US' ? 'nameEn' : 'label',
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children'
    }
  }
}
