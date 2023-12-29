import request from "@/router/axios";

//Fetch distributors
export function getInstallers() {
  return request({
    url: "/admin/dealer/installer/list",
    method: "get",
  });
}

// Fetch total data by distributor
export function getTotalByDistributor(query) {
  return request({
    url: "/admin/dealer/board/total",
    method: "get",
    params: query,
  });
}

// 用电信息
export function electricityData(query) {
  return request({
    url: "/admin/dealer/board/electricity/data",
    method: "get",
    params: query,
  });
}

// 发电收益
export function electricityIncome(query) {
  return request({
    url: "/admin/dealer/board/electricity/income",
    method: "get",
    params: query,
  });
}

// 实时功率
export function electricityPower(query) {
  return request({
    url: "/admin/dealer/board/electricity/power",
    method: "get",
    params: query,
  });
}
