import request from "@/router/axios";

// 数据汇总
export function getTotalcount() {
  return request({
    url: "/admin/administer/board/total",
    method: "get",
  });
}
