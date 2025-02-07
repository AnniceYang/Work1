import request from "@/router/axios";

// 故障信息管理  查询
export function qryFaultInfo(query) {
  return request({
    url: "/admin/lsyfault/page",
    method: "get",
    params: query,
  });
}

// 修改
export function editFaultInfo(data) {
  return request({
    url: "/admin/lsyfault/edit",
    method: "post",
    data,
  });
}

// 新增
export function addFaultInfo(data) {
  return request({
    url: "/admin/lsyfault/save",
    method: "post",
    data,
  });
}

// 通过id删除
export function delFaultInfo(data) {
  return request({
    url: "/admin/lsyfault/del",
    method: "post",
    data,
  });
}

// 设备报警分页查询
export function qryDeviceAlarm(query) {
  return request({
    url: "/admin/lsydevicealarm/page",
    method: "get",
    params: query,
  });
}

// 根据设备，时间范围批量删除
export function delBatchFault(data) {
  return request({
    url: "/admin/lsydevicealarm/edit",
    method: "post",
    data,
  });
}
