/*
 * @Descripttion: 
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: liu
 * @Date: 2021-03-09 14:30:19
 * @LastEditors: liu
 * @LastEditTime: 2021-04-07 12:28:43
 * @Update Descripttion: 
 */
/**
 * 全站权限配置
 *
 */
import router from './router/router'
import store from '@/store'
import { validatenull } from '@/util/validate'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { editResetPassword } from '@/api/admin/user'
import { isResetPasswords } from '@/config/env'


import { MessageBox, Message } from 'element-ui'
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  const meta = to.meta || {}
  if (store.getters.access_token) {
    if (store.getters.isLock && to.path !== '/lock') {
      next({ path: '/lock' })
    } else if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const value = to.query.src || to.fullPath
      const label = to.query.name || to.name
      if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
        store.commit('ADD_TAG', {
          label: label,
          value: value,
          params: to.params,
          query: to.query,
          group: router.$avueRouter.group || []
        })
      }
      next()
      if (isResetPasswords && store.getters.sfFirst === 0) {
        // MessageBox.prompt('首次登陆请重置密码', '重置密码', {
        //   showClose: false,
        //   showCancelButton: false,
        //   closeOnClickModal: false,
        //   closeOnPressEscape: false,
        //   confirmButtonText: '提交',
        //   // cancelButtonText: '取消',
        //   // inputPlaceholder:"必须包含字母和数字,可以输入+,-,*,&,$,#等字符,且在6~18之间",
        //   // inputPattern: /^(?![0-9|+|-|*|&|$|#]+$)(?![a-zA-Z|+|-|*|&|$|#]+$)(?![+|-|*|&|$|#]+$)[0-9A-Za-z|+|-|*|&|$|#]{6,18}$/,
        //   // inputErrorMessage: '密码格式不正确（必须包含字母和数字，且在6~18之间）',
        //   inputPlaceholder: "字母或数字,且在6~12之间",
        //   inputPattern: /^[5A-Za-z0-9]{6,12}$/,
        //   inputErrorMessage: '密码格式不正确（字母或数字，且在6~12之间）',
        //   beforeClose: (action, instance, done) => {
        //     if (action === 'confirm') {
        //       instance.confirmButtonLoading = true;
        //       instance.confirmButtonText = '提交中...';
        //       let dataForm = {
        //         userId: store.getters.userInfo.userId,
        //         password: instance.inputValue
        //       }
        //       editResetPassword(dataForm).then(res => {
        //         setTimeout(() => {
        //           instance.confirmButtonLoading = false;
        //         }, 300);
        //         if (res && Number(res.data.code) === 0) {
        //           done();
        //           Message({
        //             message: '重置成功,请重新登陆',
        //             type: 'success',
        //             duration: 1500,
        //             onClose: () => {
        //               store.dispatch("LogOut").then(() => {
        //                 location.reload();
        //               });
        //             }
        //           })
        //         } else {
        //           Message({
        //             message: data.msg,
        //             type: 'error',
        //             duration: 1500
        //           })
        //         }

        //       })
        //       setTimeout(() => {
        //         done();
        //         setTimeout(() => {
        //           instance.confirmButtonLoading = false;
        //         }, 300);
        //       }, 3000);
        //     } else {
        //       done();
        //     }
        //   }
        // }).then(({ value }) => {
        //   // Message({
        //   //   type: 'success',
        //   //   message: '你的邮箱是: ' + value
        //   // });
        // }).catch(() => {
        //   // Message({
        //   //   type: 'info',
        //   //   message: '取消输入'
        //   // });       
        // });
      }
    }
  } else {
    if (meta.isAuth === false) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
  const title = store.getters.tag.label
  router.$avueRouter.setTitle(title)
})
