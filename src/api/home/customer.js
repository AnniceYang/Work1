import request from "@/router/axios";

//所有设备
export function deviceList() {
  return request({
    url: "/admin/customer/device/list",
    method: "get",
  });
}

// 数据汇总
export function getTotal(query) {
  return request({
    url: "/admin/customer/board/total",
    method: "get",
    params: query,
  });
}

// 用电信息
export function electricityData(query) {
  return request({
    url: "/admin/customer/board/electricity/data",
    method: "get",
    params: query,
  });
}

// 发电收益
export function electricityIncome(query) {
  return request({
    url: "/admin/customer/board/electricity/income",
    method: "get",
    params: query,
  });
}

// 实时功率
export function electricityPower(query) {
  return request({
    url: "/admin/customer/board/electricity/power",
    method: "get",
    params: query,
  });
}
