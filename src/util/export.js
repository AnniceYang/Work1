/*
 * @Author: your name
 * @Date: 2021-04-10 09:37:34
 * @LastEditTime: 2021-04-10 09:51:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \water\src\utils\export.js
 */
import fs from 'file-saver'

export function exportExcel (res, fileName) {
  // console.log(res, 'resresres---');
  const blob = new Blob([res.data], {
    type: res.headers['content-type']
  })
  // 文件名
  fs.saveAs(blob, fileName + '.xlsx')
}
