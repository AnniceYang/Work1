import request from "@/router/axios";

//所有设备
export function deviceList() {
  return request({
    url: "/admin/installer/device/list",
    method: "get",
  });
}

// 数据汇总
export function getTotal() {
  return request({
    url: "/admin/installer/board/total",
    method: "get",
  });
}

// 用电信息
export function electricityData(query) {
  return request({
    url: "/admin/installer/board/electricity/data",
    method: "get",
    params: query
  });
}

// 发电收益
export function electricityIncome(query) {
  return request({
    url: "/admin/installer/board/electricity/income",
    method: "get",
    params: query
  });
}

// 实时功率
export function electricityPower(query) {
  return request({
    url: "/admin/installer/board/electricity/power",
    method: "get",
    params: query
  });
}
