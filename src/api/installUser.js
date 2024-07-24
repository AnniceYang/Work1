import request from "@/router/axios";

// 安装商管理  查询
export function qryInstallUser(query) {
  return request({
    url: "/admin/lsyinstaller/page",
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

// 修改
export function editInstallUser(data) {
  return request({
    url: "/admin/lsyinstaller/edit",
    method: "post",
    data,
  });
}

// 新增
export function addInstallUser(data) {
  return request({
    url: "/admin/lsyinstaller/save",
    method: "post",
    data,
  });
}

// 通过id删除
export function delInstallUser(data) {
  return request({
    url: "/admin/lsyinstaller/del",
    method: "post",
    data,
  });
}
