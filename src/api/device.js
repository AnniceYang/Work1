import request from "@/router/axios";

// 设备信息管理  查询
export function qryDevice(query) {
  return request({
    url: "/admin/lsydevice/page",
    method: "get",
    params: query,
  });
}

// 修改
export function editDevice(data) {
  return request({
    url: "/admin/lsydevice/edit",
    method: "post",
    data,
  });
}

// 新增
export function addDevice(data) {
  return request({
    url: "/admin/lsydevice/save",
    method: "post",
    data,
  });
}

// 通过id删除
export function delDevice(data) {
  return request({
    url: "/admin/lsydevice/del",
    method: "post",
    data,
  });
}

// 电池充放电设置详情
export function qryCellInfo(query) {
  return request({
    url: "/admin/lsydevicechargedischarge/info",
    method: "get",
    params: query,
  });
}

// 保存电池充放电设置
export function addCellInfo(data) {
  return request({
    url: "/admin/lsydevicechargedischarge/save",
    method: "post",
    data,
  });
}

// 恢复默认电池充放电设置
export function editCellInfo(data) {
  return request({
    url: "/admin/lsydevicechargedischarge/edit",
    method: "post",
    data,
  });
}

// 用电信息
export function qryDeviceElectricityData(query) {
  return request({
    url: "/admin/lsydeviceelectricitydata/list",
    method: "get",
    params: query,
  });
}

// 发电收益
export function qryDeviceIncomeData(query) {
  return request({
    url: "/admin/lsydeviceincomedata/list",
    method: "get",
    params: query,
  });
}

// 实时功率
export function qryDevicePowerData(query) {
  return request({
    url: "/admin/lsydevicepowerdata/list",
    method: "get",
    params: query,
  });
}

// 运行信息 mqtt
export function qryObtain(query) {
  return request({
    url: "/admin/param/set/obtain",
    method: "get",
    params: query,
  });
}

// OTA升级下发
export function deviceUpgrade(data) {
  return request({
    url: "/admin/app/version/ota/send",
    method: "post",
    data,
  });
}

// 升级记录
export function deviceUpdateRecord(query) {
  return request({
    url: "/admin/lsydeviceupgrade/page",
    method: "get",
    params: query,
  });
}

// 保存数据显示配置
export function saveConfigDataShow(data) {
  return request({
    url: "/admin/config/data/show/save",
    method: "post",
    data,
  });
}

// 数据显示配置详情
export function qryConfigDataShow() {
  return request({
    url: "/admin/config/data/show/info",
    method: "get",
  });
}

// 主动获取参数（7、-运行信息，8、系统设置, 9-电池参数）
export function getConfigData(data) {
  return request({
    url: "/admin/param/set/obtain",
    method: "get",
    params: data,
  });
}

//电池温度设置
export function batteryUpgrade(data) {
  return request({
    url: "/admin/param/set/updateBattery",
    method: "post",
    data,
  });
}

// 保存参数设置（系统设置）
export function saveConfigData(data) {
  return request({
    url: "/admin/param/set/update",
    method: "post",
    data,
  });
}

// 数据显示配置详情（电池）
export function getConfigDataCell(data) {
  return request({
    url: "/admin/config/battery/data/show/info",
    method: "get",
    params: data,
  });
}

// 保存数据显示配置（电池）
export function saveConfigDataCell(data) {
  return request({
    url: "/admin/config/battery/data/show/save",
    method: "post",
    data,
  });
}

// 自检下发
export function selfCheck(data) {
  return request({
    url: "/admin/param/set/self/check",
    method: "post",
    data,
  });
}

// 最新自检记录
export function qrySelfCheckNew(data) {
  return request({
    url: "/admin/lsydevicecheckrecord/last/info",
    method: "get",
    params: data,
  });
}

// 分页自检记录
export function qrySelfCheckRecord(data) {
  return request({
    url: "/admin/lsydevicecheckrecord/page",
    method: "get",
    params: data,
  });
}
