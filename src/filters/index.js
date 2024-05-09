function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + "s";
}

/**
 * 日期格式化
 */
export function dateFormat(date) {
  let format = "yyyy-MM-dd hh:mm:ss";
  if (date !== "Invalid Date") {
    var o = {
      "M+": date.getMonth() + 1, // month
      "d+": date.getDate(), // day
      "h+": date.getHours(), // hour
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
      "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds(), // millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return format;
  }
  return "";
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour");
  } else {
    return pluralize(~~(between / 86400), " day");
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || time === "-1" || time === "0" || !time) {
    return null;
  }

  if ((time + "").length === 10) {
    time = +time * 1000;
  }

  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    date = new Date(parseInt(time, 10));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a")
      return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/* 数字 格式化 */
export function nFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

export function html2Text(val) {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function toThousandslsFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

export function appTypeFilter(value) {
  let str = "";
  switch (value) {
    case 0:
      str = "安卓";
      break;
    case 1:
      str = "IOS";
      break;
    case 2:
      str = "通讯棒";
      break;
    case 3:
      str = "MCU";
      break;
    case 4:
      str = "DSP1";
      break;
    case 5:
      str = "电池";
      break;
    case 6:
      str = "二期通讯板";
      break;
    case 7:
      str = "二期驱动板";
      break;
    case 8:
      str = "二期电池";
      break;
    case 9:
      str = "高压电池BCU模块（固件类型：8）";
      break;
    case 10:
      str = "高压电池BMS模块（固件类型：5）";
      break;
    case 11:
      str = "DSP1";
      break;
  }
  return str;
}

export function feedbackTypeFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "下载/加载问题";
      break;
    case 1:
      str = "图片章节问题";
      break;
    case 2:
      str = "APP体验问题";
      break;
    case 3:
      str = "其它问题";
      break;
    default:
      break;
  }
  return str;
}

export function feedbackStateFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "待查阅";
      break;
    case 1:
      str = "已查阅";
      break;
    case 2:
      str = "需要处理";
      break;
    case 3:
      str = "已处理";
      break;
    default:
      break;
  }
  return str;
}

export function logoutTypeFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "多账号，释放邮箱号";
      break;
    case 1:
      str = "不想使用了";
      break;
    case 2:
      str = "其它";
      break;
    default:
      break;
  }
  return str;
}

export function faultLevelFilter(val) {
  let str = "";
  switch (val) {
    case 1:
      str = "一级";
      break;
    case 2:
      str = "二级";
      break;
    case 3:
      str = "三级";
      break;
    default:
      break;
  }
  return str;
}

export function devStatusFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "正常";
      break;
    case 1:
      str = "维护";
      break;
    case 2:
      str = "离线";
      break;
    case 3:
      str = "报错";
      break;
    default:
      break;
  }
  return str;
}

export function addGradeFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "国家";
      break;
    case 1:
      str = "地区";
      break;
    case 2:
      str = "居住地";
      break;
    default:
      break;
  }
  return str;
}

export function userTypeFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "后台";
      break;
    case 1:
      str = "安装商";
      break;
    case 2:
      str = "用户";
      break;
    default:
      break;
  }
  return str;
}

export function systemRunStatusFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "无";
      break;
    case 1:
      str = "PV离网";
      break;
    case 2:
      str = "电网运行";
      break;
    case 3:
      str = "电池离网";
      break;
    case 4:
      str = "PV电池离网";
      break;
    case 5:
      str = "电池并网";
      break;
    case 6:
      str = "PV并网";
      break;
    case 7:
      str = "PV电池并网";
      break;
    case 8:
      str = "系统待机";
      break;
    case 9:
      str = "系统启动中";
      break;
    case 10:
      str = "系统停机";
      break;
    default:
      break;
  }
  return str;
}

export function gridStatusFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "N/A";
      break;
    case 1:
      str = "单独供电";
      break;
    case 2:
      str = "并网卖电";
      break;
    case 3:
      str = "并网买电";
      break;
    default:
      break;
  }
  return str;
}

export function inverterStatusFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "N/A";
      break;
    case 1:
      str = "逆变放电";
      break;
    case 2:
      str = "整流充电";
      break;
    default:
      break;
  }
  return str;
}

export function meterNormalStatusFilter(val) {
  let str = "";
  switch (val) {
    case 1:
      str = "电表通讯正常";
      break;
    case 2:
      str = "电表通讯异常";
      break;
    default:
      break;
  }
  return str;
}

export function dataTypeList(val) {
  let str = "";
  switch (val) {
    case 1:
      str = "新闻中心";
      break;
    case 2:
      str = "安装说明";
      break;
    case 3:
      str = "安装视频";
      break;
    case 4:
      str = "用户手册";
      break;
    case 5:
      str = "故障排查";
      break;
    case 6:
      str = "Q&A";
      break;
    default:
      break;
  }
  return str;
}

export function onlineStatusFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "离线";
      break;
    case 1:
      str = "在线";
      break;
    case 2:
      str = "升级中";
      break;
    default:
      break;
  }
  return str;
}

export function updateType(val) {
  let str = "";
  switch (val) {
    case 1:
      str = "通讯棒";
      break;
    case 2:
      str = "MCU";
      break;
    case 3:
      str = "DSP1";
      break;
    case 4:
      str = "电池";
      break;
    case 6:
      str = "二期通讯板";
      break;
    case 7:
      str = "二期驱动板";
      break;
    case 8:
      str = "二期电池";
      break;
    case 9:
      str = "高压电池BCU模块（固件类型：8）";
      break;
    case 10:
      str = "高压电池BMS模块（固件类型：5）";
      break;
    case 11:
      str = "DSP1";
      break;
    default:
      break;
  }
  return str;
}

export function updateStatusFilter(val) {
  let str = "";
  switch (val) {
    case 0:
      str = "待确认 ";
      break;
    case 1:
      str = "已确认";
      break;
    case 2:
      str = "升级中";
      break;
    case 3:
      str = "升级失败";
      break;
    case 4:
      str = "升级成功";
      break;
    default:
      break;
  }
  return str;
}

export function systemModeFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "电池优先模式 ";
      break;
    case 1:
      str = "家庭负载优先模式";
      break;
    case 2:
      str = "电网优先模式";
      break;
    case 3:
      str = "全功率馈网模式";
      break;
    case 4:
      str = "应急后备模式";
      break;
    case 5:
      str = "AC充电关应急后备模式";
      break;
    case 6:
      str = "纯PV模式";
      break;
    case 7:
      str = "强制离网模式";
      break;
    default:
      break;
  }
  return str;
}

export function systemStateFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "无 ";
      break;
    case 1:
      str = "PV离网";
      break;
    case 2:
      str = "电网运行";
      break;
    case 3:
      str = "电池离网";
      break;
    case 4:
      str = "PV电池离网";
      break;
    case 5:
      str = "电池并网";
      break;
    case 6:
      str = "PV并网";
      break;
    case 7:
      str = "PV电池并网";
      break;
    case 8:
      str = "系统待机";
      break;
    case 9:
      str = "系统启动中";
      break;
    case 10:
      str = "系统停机";
      break;
    default:
      break;
  }
  return str;
}

export function batteryStatusFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "无 ";
      break;
    case 1:
      str = "恒流充电";
      break;
    case 2:
      str = "恒压充电";
      break;
    case 3:
      str = "浮充";
      break;
    case 4:
      str = "充满";
      break;
    case 5:
      str = "放电";
      break;
    case 6:
      str = "强制充电";
      break;
    case 7:
      str = "检测电池状态";
      break;
    default:
      break;
  }
  return str;
}

export function BMSFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "无BMS ";
      break;
    case 1:
      str = "BMS通讯正常";
      break;
    default:
      break;
  }
  return str;
}

export function GridStateFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "N/A";
      break;
    case 1:
      str = "单独供电";
      break;
    case 2:
      str = "并网卖电";
      break;
    case 3:
      str = "并网买电";
      break;
    default:
      break;
  }
  return str;
}

export function CTFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "CT买电";
      break;
    case 1:
      str = "CT馈电";
      break;
    case 2:
      str = "无CT";
      break;
    default:
      break;
  }
  return str;
}

export function invertingStateFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "N/A";
      break;
    case 1:
      str = "逆变放电";
      break;
    case 2:
      str = "整流充电";
      break;
    default:
      break;
  }
  return str;
}

export function meterNormalFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "电表通讯异常";
      break;
    case 1:
      str = "电表通讯正常";
      break;
    default:
      break;
  }
  return str;
}

export function selfCheckFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "NULL";
      break;
    case 1:
      str = "自检中";
      break;
    case 2:
      str = "自检失败";
      break;
    case 3:
      str = "自检完成";
      break;
    default:
      break;
  }
  return str;
}

export function timeZoneFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "零区";
      break;
    case 1:
      str = "东一区";
      break;
    case 2:
      str = "东二区";
      break;
    case 3:
      str = "东三区";
      break;
    case 4:
      str = "东四区";
      break;
    case 5:
      str = "东五区";
      break;
    case 6:
      str = "东六区";
      break;
    case 7:
      str = "东七区";
      break;
    case 8:
      str = "东八区";
      break;
    case 9:
      str = "东九区";
      break;
    case 9.5:
      str = "东九点五区";
      break;
    case 10:
      str = "东十区";
      break;
    case 10.5:
      str = "东十点五区";
      break;
    case 11:
      str = "东十一区";
      break;
    case 12:
      str = "东十二区";
      break;
    case 13:
      str = "东十三区";
      break;
    case -1:
      str = "西一区";
      break;
    case -2:
      str = "西二区";
      break;
    case -3:
      str = "西三区";
      break;
    case -4:
      str = "西四区";
      break;
    case -5:
      str = "西五区";
      break;
    case -6:
      str = "西六区";
      break;
    case -7:
      str = "西七区";
      break;
    case -8:
      str = "西八区";
      break;
    case -9:
      str = "西九区";
      break;
    case -10:
      str = "西十区";
      break;
    case -11:
      str = "西十一区";
      break;
    default:
      break;
  }
  return str;
}

export function USBFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "无";
      break;
    case 1:
      str = "历史记录导出中";
      break;
    case 2:
      str = "参数配置导出中";
      break;
    case 3:
      str = "参数配置导入中";
      break;
    case 4:
      str = "逆变监控板升级中";
      break;
    case 5:
      str = "逆变主控板升级中";
      break;
    case 6:
      str = "固件导入中";
      break;
    default:
      break;
  }
  return str;
}

export function energyFlowFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "空心";
      break;
    case 1:
      str = "正向流动";
      break;
    case 2:
      str = "反向流动";
      break;
    case 3:
      str = "实心";
      break;
    default:
      break;
  }
  return str;
}

export function val73Filter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "无系统锁";
      break;
    case 1:
      str = "单体过压";
      break;
    case 2:
      str = "单体欠压";
      break;
    case 3:
      str = "充电过流";
      break;
    case 4:
      str = "放电过流1";
      break;
    case 5:
      str = "放电过流2";
      break;
    case 6:
      str = "充电过温";
      break;
    case 7:
      str = "放电过温";
      break;
    case 8:
      str = "充电低温";
      break;
    case 9:
      str = "放电低温";
      break;
    case 10:
      str = "总压采集和计算值不符";
      break;
    case 11:
      str = "从板采集放电电流和主板不符";
      break;
    case 12:
      str = "从板采集充电电流和主板不符";
      break;
    default:
      break;
  }
  return str;
}

export function val74Filter(val) {
  let str = "";
  const arr = val.split(",");
  arr.forEach((item, index) => {
    switch (index) {
      case 0:
        str += `电压告警${item == 1 ? "开" : "关"};`;
        break;
      case 1:
        str += `过流告警${item == 1 ? "开" : "关"};`;
        break;
      case 2:
        str += `过温告警${item == 1 ? "开" : "关"};`;
        break;
      case 3:
        str += `过流告警${item == 1 ? "开" : "关"};`;
        break;
      case 4:
        str += `电芯不均衡告警${item == 1 ? "开" : "关"};`;
        break;
      case 5:
        str += `环境温度告警${item == 1 ? "开" : "关"};`;
        break;
      case 6:
        str += `SOC低告警${item == 1 ? "开" : "关"};`;
        break;
      case 7:
        str += `充电加热使能${item == 1 ? "开" : "关"};`;
        break;
      default:
        break;
    }
  });
  return str;
}

export function selfTestTypeFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "空闲";
      break;
    case 1:
      str = "一段过压(59.S1)";
      break;
    case 2:
      str = "二段过压(59.S2)";
      break;
    case 3:
      str = "一段欠压(27.S1)";
      break;
    case 4:
      str = "二段欠压(27.S2)";
      break;
    case 5:
      str = "一段过频(81>.S1)";
      break;
    case 6:
      str = "二段过频(81>.S2)";
      break;
    case 7:
      str = "一段欠频(81<.S1)";
      break;
    case 8:
      str = "二段欠频(81<.S2)";
      break;
    default:
      break;
  }
  return str;
}

export function displayTypeValFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "LCD";
      break;
    case 1:
      str = "D-6K";
      break;
    case 2:
      str = "LESY";
      break;
    default:
      break;
  }
  return str;
}

export function countryCodeValFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "中国";
      break;
    case 1:
      str = "意大利";
      break;
    case 2:
      str = "德国";
      break;
    case 3:
      str = "澳大利亚";
      break;
    case 4:
      str = "比利时";
      break;
    case 5:
      str = "南非";
      break;
    case 6:
      str = "英国";
      break;
    case 7:
      str = "西班牙";
      break;
    case 8:
      str = "欧洲50549";
      break;
    case 9:
      str = "爱尔兰";
      break;
    default:
      break;
  }
  return str;
}

export function equilibriumStateValFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "关";
      break;
    case 1:
      str = "开";
      break;
    default:
      break;
  }
  return str;
}

export function systemLockStatusSerialNumberValFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "无系统锁";
      break;
    case 1:
      str = "单体过压";
      break;
    case 2:
      str = "单体欠压";
      break;
    case 3:
      str = "充电过流";
      break;
    case 4:
      str = "放电过流1";
      break;
    case 5:
      str = "放电过流2";
      break;
    case 6:
      str = "充电过温";
      break;
    case 7:
      str = "放电过温";
      break;
    case 8:
      str = "充电低温";
      break;
    case 9:
      str = "放电低温";
      break;
    case 10:
      str = "总压采集和计算值不符";
      break;
    case 11:
      str = "从板采集放电电流和主板不符";
      break;
    case 12:
      str = "从板采集充电电流和主板不符";
      break;
    default:
      break;
  }
  return str;
}

export function batteryChargingAndDischargingHeatingEnableStateValFilter(val) {
  let str = "";
  switch (Number(val)) {
    case 0:
      str = "检测中";
      break;
    case 1:
      str = "充放电加热均开启";
      break;
    case 2:
      str = "仅充电加热开启";
      break;
    case 3:
      str = "仅放电加热开启";
      break;
    case 4:
      str = "关闭";
      break;
    default:
      break;
  }
  return str;
}
