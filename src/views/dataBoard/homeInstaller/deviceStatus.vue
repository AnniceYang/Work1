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
    setOptions({ data } = {}) {
      this.chart.setOption({
        // tooltip: {
        //   trigger: "item",
        // },
        // legend: {
        //   top: "5%",
        //   left: "center",
        // },
        legend: {
          orient: "vertical",
          left: "right",
          formatter: function (name) {
            console.log(name)
            // 添加
            let value = '';
            let rate = '';
            for (let i = 0; i < data.length; i++) {
              if (data[i].name === name) {
                value = data[i].value
                rate = data[i].rate;
              }
            }
            var arr = [
              "{a|" + name + "}",
              "{c|" + value + "}",
              "{b|(" + rate + "%)}",
            ];
            return arr.join("  ");
          },
          textStyle: {
            padding: [2, 0, 0, 0],
            rich: {
              a: {
                fontSize: 15,
                width: 110,
                // color: "#c1c1c1",
              },
              b: {
                fontSize: 15,
                width: 40,
                color: "#c1c1c1",
              },
              c: {
                fontSize: 15,
                color: "#c1c1c1",
              },
            },
          },
        },
        grid: {
          // top: 40,
          // bottom: 45,
          // right: 20,
        },
        color: ["#208A42", "#EEEEEE", "#FD9F15"],
        series: [
          {
            // name: "Access From",
            type: "pie",
            center: ['40%', '50%'], //饼图位置
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: {
              position: "center",
              show: true,
              formatter: function () {
                let str =
                  "{a|" +
                  data[0].rate +
                  "%}" +
                  "\n\n" +
                  "{b|" +
                  data[0].name +
                  "}";
                return str;
              },
              rich: {
                a: {
                  color: "#333333", //a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
                  fontSize: "16",
                },
                b: {
                  fontSize: "14",
                  color: "#BCBCBC",
                },
              },
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: 40,
            //     fontWeight: "bold",
            //   },
            // },
            labelLine: {
              show: false,
            },
            data,
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
