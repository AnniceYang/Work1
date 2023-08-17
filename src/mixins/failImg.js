/*
 * @Descripttion: 图片显示错误
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: liu
 * @Date: 2021-03-11 09:30:58
 * @LastEditors: liu
 * @LastEditTime: 2021-03-11 09:44:14
 * @Update Descripttion: 
 */
// 全局声明图片显示错误
import failImg from '@/assets/img/fail.png'
export default  {
  data() {
    return {
      errorImg: 'this.src="' + failImg + '"'
    }
  }
}