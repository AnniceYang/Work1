/*
 * @Descripttion: 
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: liu
 * @Date: 2021-03-09 14:30:19
 * @LastEditors: 贾
 * @LastEditTime: 2021-04-27 10:31:35
 * @Update Descripttion: 
 */
const getters = {
  tag: state => state.tags.tag,
  website: state => state.common.website,
  userInfo: state => state.user.userInfo,
  theme: state => state.common.theme,
  themeName: state => state.common.themeName,
  isShade: state => state.common.isShade,
  isCollapse: state => state.common.isCollapse,
  keyCollapse: (state, getters) => getters.screen > 1 ? getters.isCollapse : false,
  screen: state => state.common.screen,
  isLock: state => state.common.isLock,
  isFullScreen: state => state.common.isFullScreen,
  lockPasswd: state => state.common.lockPasswd,
  tagList: state => state.tags.tagList,
  tagWel: state => state.tags.tagWel,
  access_token: state => state.user.access_token,
  refresh_token: state => state.user.refresh_token,
  expires_in: state => state.user.expires_in,
  sfFirst:state => state.user.sfFirst,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  menu: state => state.user.menu,
  menuAll: state => state.user.menuAll,
  logsList: state => state.logs.logsList,
  logsLen: state => state.logs.logsList.length || 0,
  logsFlag: (state, getters) => getters.logsLen === 0,
  language: state => state.common.language,
  messageNum: state => state.user.messageNum
}
export default getters
