import Layout from '@/page/index/'

export default [{
  path: '/login',
  name: '登录页',
  component: () =>
    import(/* webpackChunkName: "page" */ '@/page/login/index'),
  meta: {
    keepAlive: true,
    isTab: false,
    isAuth: false
  }
}, 
{
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "views" */ '@/page/wel')
  }]
},
  {
    path: '/lock',
    name: '锁屏页',
    component: () => import(/* webpackChunkName: "page" */ '@/page/lock/index'),
    redirect: '/pages1',
    children:[
      {
        path:'/pages1',
        component: () => import(/* webpackChunkName: "page" */ '@/page/lock/pages1'),
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
        }
      },
      {
        path:'/pages2',
        component: () => import(/* webpackChunkName: "page" */ '@/page/lock/pages2'),
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
        }
      } 
    ],
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/components/error-page/404'),
    name: '404',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: true
    }

  },
  {
    path: '/403',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/components/error-page/403'),
    name: '403',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/500',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/components/error-page/500'),
    name: '500',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/',
    name: '主页',
    redirect: '/wel'
  },
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
      path: ':routerPath',
      name: 'iframe',
      component: () =>
        import(/* webpackChunkName: "page" */ '@/components/iframe/main'),
      props: true
    }]
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/authredirect',
    name: '授权页',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/page/login/authredirect'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  }]
