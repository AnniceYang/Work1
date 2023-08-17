<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/util/util'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
      setTimeout(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 600)
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions({ xData, yDataSpontaneousIncome, yDataSellIncome, yDataAvgIncome } = {}) {
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: xData
        },
        legend: {
          data: ['自发收益', '卖电收益', '总收益']
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 20,
          bottom: 35,
          right: 10,
          left: 50
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: yDataSpontaneousIncome,
            type: 'bar',
            name: '自发收益',
            color: '#19D2B3'
          }, {
            data: yDataSellIncome,
            type: 'bar',
            name: '卖电收益',
            color: '#71C6FF'
          }, {
            data: yDataAvgIncome,
            type: 'bar',
            name: '总收益',
            color: '#FFF06E'
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
