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
    color: {
      type: String,
      default: "#208A42",
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
       
        // graphic: [
        //   {
        //     // formatter: [
        //     //     `{a|${params.name}}`,
        //     //     `{b|${params.percent + "%"}}`
        //     // ].join('\n'),
        //     //环形图中间添加文字
        //     type: "text", //通过不同top值可以设置上下显示
        //     // left: "34%",
        //     // top: "44%",
        //     style: {
        //       text: [`${data[0].value}%`, `${this.title}`].join(
        //         "\n"
        //       ),
        //       textAlign: "center",
        //       fill: "#1E7CE8", //文字的颜色
        //       fontSize: 12,
        //       lineHeight: 16,
        //     },
        //   },
        // ],
        color: [this.color, "#EEEEEE"],
        series: [
          {
            // name: "Access From",
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: {
              position: "center",
              show: true,
              formatter: function () {
                let str = "{a|" + data[0].value + "%}" + "\n\n" + "{b|" + data[0].name +"}";
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
