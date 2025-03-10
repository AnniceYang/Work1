import request from "@/router/axios";
import axios from "axios";

//获取澳洲电网公司列表，哔哩哔气
export function listPowerGrid() {
  return request({
    url: "/admin/powerGrid/getPowerGridList",
    method: "get",
  });
}

//保存电网名称以及NMI
export function saveGridNMI(data) {
  return request({
    url: "/admin/powerGrid/save",
    method: "post",
    data,
  });
}

// 通过id查询电网信息
export function qryPowerGrid(query) {
  return request({
    url: "/admin/powerGrid/get",
    method: "get",
    params: query,
  });
}

// 发电机设置详情
export function qryGenerator(query) {
  return request({
    url: "/admin/generator/info",
    method: "get",
    params: query,
  });
}

// 发电机控制模式列表
export function listGeneratorControlMode() {
  return request({
    url: "/admin/generator/controlModeList",
    method: "get",
  });
}

// 发电机输出模式列表
export function listGeneratorOutputMode() {
  return request({
    url: "/admin/generator/outputModeList",
    method: "get",
  });
}

//保存发电机设置
export function generatorSet(data) {
  return request({
    url: "/admin/generator/operate",
    method: "post",
    data,
  });
}

// 删除发电机设置
export function delGenerator(data) {
  return request({
    url: "/admin/generator/del",
    method: "post",
    data,
  });
}

// 设备信息管理  查询
export function qryDevice(query) {
  return request({
    url: "/admin/lsydevice/page",
    method: "get",
    params: query,
  });
}

// admin数据看板获取安装商列表
export function listAgent() {
  return request({
    url: "/admin/lsydevice/listAgent",
    method: "get",
  });
}

// admin数据看板查看安装数据
export function installData(query) {
  return request({
    url: "/admin/administer/board/installer",
    method: "get",
    params: query,
  });
}

// 设备信息详情  查询
export function qryDeviceDetail(query) {
  return request({
    url: "/admin/lsydevice/info",
    method: "get",
    params: query,
  });
}

// 设备信息绑定及详情查询
export function qryDeviceBind(data) {
  return request({
    url: "/admin/lsydevice/detail",
    method: "get",
    params: data,
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

// 设备-编辑-回显信息
export function editFeedback(data) {
  return request({
    url: "/admin/lsydevice/editFeedback",
    method: "get",
    params: data,
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

// 通过id安装自检
export function checkDevice(query) {
  return request({
    url: "/admin/lsydevice/check",
    method: "get",
    params: query,
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

// 实时功率曲线
export function qryDevicePowerData(query) {
  return request({
    url: "/admin/lsydevicepowerdata/curve",
    method: "get",
    params: query,
  });
}
// 实时功率表单
export function qryDevicePowerDataTable(query) {
  return request({
    url: "/admin/lsydevicepowerdata/table",
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

// 单相-定时设置显示配置以及澳洲选配电表配置
export function qryPage11ConfigDataShow(query) {
  return request({
    url: "/admin/config/hm6/page",
    method: "get",
    params: query,
  });
}

// 单相-定时设置配置以及澳洲选配电表配置-新增或修改
export function Page11ConfigModify(data) {
  return request({
    url: "/admin/config/hm6/modify",
    method: "post",
    data,
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

// 保存三相系统的定时设置（系统设置）page 49
export function savePage49ConfigData(data) {
  return request({
    url: "/admin/param/set/updatePage49",
    method: "post",
    data,
  });
}

// 保存Page11定时设置参数设置
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

// 导出所选择的自检记录的 PDF
export function qrySelfCheckPDF(selectedRecords) {
  return request({
    url: "/admin/lsydevicecheckrecord/pdf/export",
    method: "post",
    responseType: "blob", // 响应类型为 Blob，用于处理二进制数据
    data: selectedRecords,
  });
}

export function qrySelfCheckRecordPDF(ids) {
  return request({
    url: `/admin/lsydevicecheckrecord/export/pdf/${ids.join(",")}`,
    method: "get",
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

// ieee设备列表
export function qryIeeeDeviceList(data) {
  return request({
    url: "/admin/ieee/page",
    method: "get",
    params: data,
  });
}
