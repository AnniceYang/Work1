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
    setOptions({ xData, yDataTotalElec, yDataLoadElec, yDataPvElec, yDataFeedNetwork, yDataBuyElec } = {}) {
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: xData
        },
        legend: {
          data: [this.$t('deviceManage.capacity'), this.$t('deviceManage.photovoltaicPowerGeneration'), this.$t('deviceManage.sellingElectricity'), this.$t('deviceManage.buyingElectricity')]
        },
        tooltip: {
          trigger: 'axis',
          // formatter: '{b0}<br />负载量：{c0}kWh<br />光伏发电量：{c1}kWh<br />卖电量：{c2}kWh<br />买电量：{c3}kWh'
        },
        grid: {
          top: 30,
          bottom: 35,
          right: 10,
          left: 50
        },
        yAxis: {
          type: 'value',
          name: 'kWh',
        },
        series: [
          {
            data: yDataLoadElec,
            type: 'bar',
            name: this.$t('deviceManage.capacity'),
            color: '#21BDE8'
          }, {
            data: yDataPvElec,
            type: 'bar',
            name: this.$t('deviceManage.photovoltaicPowerGeneration'),
            color: '#FFF06E'
          }, {
            data: yDataFeedNetwork,
            type: 'bar',
            name: this.$t('deviceManage.sellingElectricity'),
            color: '#FF3D44'
          }, {
            data: yDataBuyElec,
            type: 'bar',
            name: this.$t('deviceManage.buyingElectricity'),
            color: '#B65FF3'
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
