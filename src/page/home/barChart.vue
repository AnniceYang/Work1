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
    setOptions({ xData, yDataOrderNum, yDataPrice, yDataSellMoney } = {}) {
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: xData
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
            data: yDataSellMoney,
            type: 'line',
            name: '销售金额'
          }, {
            data: yDataOrderNum,
            type: 'line',
            name: '订单数'
          }, {
            data: yDataPrice,
            type: 'line',
            name: '客单价'
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
