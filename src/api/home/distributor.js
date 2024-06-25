import request from "@/router/axios";

//Fetch distributors
export function getDistributors() {
  return request({
    url: "/admin/distributor/installer/list",
    method: "get",
  });
}

// Fetch total data by distributor
export function getTotalDistributor(query) {
  return request({
    url: "/admin/distributor/board/total",
    method: "get",
    params: query,
  });
}

// 用电信息
export function electricityData(query) {
  return request({
    url: "/admin/distributor/board/electricity/data",
    method: "get",
    params: query,
  });
}

// 发电收益
export function electricityIncome(query) {
  return request({
    url: "/admin/distributor/board/electricity/income",
    method: "get",
    params: query,
  });
}

// 实时功率
export function electricityPower(query) {
  return request({
    url: "/admin/distributor/board/electricity/power",
    method: "get",
    params: query,
  });
}
