import request from "@/router/axios";

// 用户列表 查询
export function qryAppUser(query) {
  return request({
    url: "/admin/lsyuser/page",
    method: "get",
    params: query,
  });
}

// 安装商列表 查询
export function qryinstallUser() {
  return request({
    url: "/admin/lsydevice/listAgent",
    method: "get",
  });
}
// 冻结用户
export function lockAppUser(data) {
  return request({
    url: "/admin/lsyuser/lock",
    method: "post",
    data,
  });
}

// 通过id查询
export function qryAppUserInfo(query) {
  return request({
    url: "/admin/lsyuser/info",
    method: "get",
    params: query,
  });
}

// 通过id删除用户信息管理
export function delAppUser(data) {
  return request({
    url: "/admin/lsyuser/del",
    method: "post",
    data,
  });
}

// 用户电价设置详情
export function getAppUserCellInfo() {
  return request({
    url: "/admin/lsyuserelecprice/info",
    method: "get",
  });
}

// 保存电价设置
export function saveAppUserCellInfo(data) {
  return request({
    url: "/admin/lsyuserelecprice/save",
    method: "post",
    data,
  });
}

// 根据用户查询电价设置详情  userId 传0
export function getDefaultCellInfo(query) {
  return request({
    url: "/admin/lsyuserelecprice/user/info",
    method: "get",
    params: query,
  });
}

// 默认电价设置
export function saveDefaultCellInfo(data) {
  return request({
    url: "/admin/lsyuserelecprice/default/save",
    method: "post",
    data,
  });
}
