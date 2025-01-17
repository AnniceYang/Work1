<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/util/util";

export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.initChart();
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
      setTimeout(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 600);
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHandler);
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    setOptions({
      xData,
      yDataBattery,
      yDataPvElec,
      yDataLoadElec,
      yDataFeedNetwork,
      yDataBuyElec,
      yDataBatteryTotalSoc,
    } = {}) {
      const sanitizeData = (data) => data.map((value) => Math.max(0, value)); // 过滤负值

      this.chart.setOption({
        grid: {
          top: 40,
          bottom: 35,
          left: 50,
          right: 50,
        },
        xAxis: {
          type: "category",
          data: xData,
          boundaryGap: false, // 设置为 false，消除横轴上的间距
          axisLabel: {
            show: true, // 显示横坐标标签
            textStyle: {
              color: "#666", // 可选：设置横坐标标签颜色
            },
          },
        },
        legend: {
          data: [
            this.$t("deviceManage.battery"),
            this.$t("deviceManage.photovoltaic"),
            this.$t("deviceManage.load"),
            this.$t("deviceManage.sellingElectricity"),
            this.$t("deviceManage.buyingElectricity"),
            this.$t("deviceManage.batteryTotalSoc"),
          ],
        },
        tooltip: {
          trigger: "axis",
          // formatter: '{b0}<br />电池：{c0}w<br />光伏：{c1}w<br />负载：{c2}w<br />卖电：{c3}w<br />买电：{c4}w'
        },

        yAxis: [
          {
            type: "value",
            name: "P (W)",
            position: "left",
          },
          {
            type: "value",
            name: "SOC (%)",
            min: 0,
            max: 100,
            position: "right",
          },
        ],
        series: [
          {
            data: sanitizeData(yDataBattery),
            type: "line",
            name: this.$t("deviceManage.battery"),
            color: "#50EE55",
            yAxisIndex: 0,
            symbol: "roundRect",
          },
          {
            data: sanitizeData(yDataPvElec),
            type: "line",
            name: this.$t("deviceManage.photovoltaic"),
            color: "#FAC858",
            yAxisIndex: 0,
            symbol: "roundRect",
          },
          {
            data: sanitizeData(yDataLoadElec),
            type: "line",
            name: this.$t("deviceManage.load"),
            color: "#21BDE8",
            yAxisIndex: 0,
            symbol: "roundRect",
          },
          {
            data: sanitizeData(yDataFeedNetwork),
            type: "line",
            name: this.$t("deviceManage.sellingElectricity"),
            color: "#FF3D44",
            yAxisIndex: 0,
            symbol: "roundRect",
          },
          {
            data: sanitizeData(yDataBuyElec),
            type: "line",
            name: this.$t("deviceManage.buyingElectricity"),
            color: "#B65FF3",
            yAxisIndex: 0,
            symbol: "roundRect",
          },
          {
            data: sanitizeData(yDataBatteryTotalSoc),
            type: "line",
            name: this.$t("deviceManage.batteryTotalSoc"),
            color: "#6B8E23",
            symbol: "roundRect",
            yAxisIndex: 1,
          },
        ],
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
  },
};
</script>
