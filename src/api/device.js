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

//批量导入
export function importExcel(data) {
  return request({
    url: "/admin/lsydevice/importExcel",
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

//解除安装商绑定
export function unbindAgent(data) {
  return request({
    url: "/admin/lsydevice/unbindAgent",
    method: "post",
    data,
  });
}

//解除用户绑定
export function unbindUser(data) {
  return request({
    url: "/admin/lsydevice/unbindUser",
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

//三相系统显示配置详情
//page Type41监控数据 42主控数据 43电表数据
//44EAST-BCU数据 45EAST-BMS数据 46设备信息
//47监控设置 48主控用户 49日期设置量
export function qryTpConfigDataShow(query) {
  return request({
    url: "/admin/tp/config/page",
    method: "get",
    params: query,
  });
}

//三相-页面参数配置-新增或修改
export function TpConfigModify(data) {
  return request({
    url: "/admin/tp/config/modify",
    method: "post",
    data,
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

//电池设置自定义值
export function batterySetCustom(data) {
  return request({
    url: "/admin/param/set/updatePage9",
    method: "post",
    data,
  });
}

//电池使能设置项
export function updateEnable(data) {
  return request({
    url: "/admin/param/set/updateEnableSetting ",
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

// 保存三相系统的参数设置（系统设置）page 47
export function savePage47ConfigData(data) {
  return request({
    url: "/admin/param/set/updatePage47",
    method: "post",
    data,
  });
}

// 保存三相系统的参数设置（系统设置）page 48
export function savePage48ConfigData(data) {
  return request({
    url: "/admin/param/set/updatePage48",
    method: "post",
    data,
  });
}

// 保存Page11参数设置（系统设置）
export function savePage11ConfigData(data) {
  return request({
    url: "/admin/param/set/updatePage11",
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
